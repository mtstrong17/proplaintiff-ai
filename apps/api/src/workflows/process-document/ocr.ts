import { S3Client } from '@aws-sdk/client-s3';
import {
  Block,
  GetDocumentAnalysisCommand,
  StartDocumentAnalysisCommand,
  TextractClient,
} from '@aws-sdk/client-textract';
import { isValid, parse } from 'date-fns';
import { writeFile } from 'fs/promises';

interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Citation {
  text: string;
  confidence: number;
  boundingBox?: BoundingBox;
}

interface DateInfo {
  date: Date;
  text: string;
  confidence: number;
  boundingBox?: BoundingBox;
  citationIndex: number;
  pageNumber: number;
}

interface Page {
  pageNumber: number;
  text: string;
  citations: Citation[];
  dates: DateInfo[];
}

interface DistinctDate {
  date: Date;
  text: string;
  confidence: number;
  boundingBox?: BoundingBox;
  occurrences: number[]; // Array of page numbers where this date appears
}

interface TextractResponse {
  pages: Page[];
  totalDates: number;
  distinctDates: DistinctDate[];
}

// Common date formats to try parsing
const DATE_FORMATS = [
  'MM/dd/yyyy',
  'MM-dd-yyyy',
  'MM.dd.yyyy',
  'yyyy-MM-dd',
  'MM/dd/yy',
  'MM-dd-yy',
  'MM.dd.yy',
  'MMMM d, yyyy',
  'MMMM d yyyy',
  'MMM d, yyyy',
  'MMM d yyyy',
  'd MMMM yyyy',
  'd MMM yyyy',
];

function isLineBlock(block: Block): block is Block & { Text: string } {
  return block.BlockType === 'LINE' && typeof block.Text === 'string';
}

function extractDates(
  text: string,
  confidence: number,
  citationIndex: number,
  boundingBox?: BoundingBox
): DateInfo[] {
  const dates: DateInfo[] = [];

  // Split text into words and look for potential date patterns
  const words = text.split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word) {
      continue;
    }

    // Try each date format
    for (const format of DATE_FORMATS) {
      const parsedDate = parse(word, format, new Date());

      if (isValid(parsedDate)) {
        dates.push({
          date: parsedDate,
          text: word,
          confidence,
          boundingBox,
          citationIndex,
          pageNumber: 0, // Placeholder for page number
        });
        break; // Found a valid date, move to next word
      }
    }
  }

  return dates;
}

async function pollForCompletion(
  textractClient: TextractClient,
  jobId: string,
  maxAttempts: number = 60,
  intervalMs: number = 2000
): Promise<void> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const command = new GetDocumentAnalysisCommand({
      JobId: jobId,
    });

    const response = await textractClient.send(command);

    if (response.JobStatus === 'SUCCEEDED') {
      return;
    } else if (response.JobStatus === 'FAILED') {
      throw new Error(`Textract job failed: ${response.StatusMessage || 'Unknown error'}`);
    }

    attempts++;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error('Textract job timed out');
}

async function getAllBlocks(textractClient: TextractClient, jobId: string): Promise<Block[]> {
  const allBlocks: Block[] = [];
  let nextToken: string | undefined;

  do {
    const command = new GetDocumentAnalysisCommand({
      JobId: jobId,
      NextToken: nextToken,
    });

    const response = await textractClient.send(command);

    if (!response.Blocks) {
      throw new Error('No blocks found in the document analysis response');
    }

    allBlocks.push(...response.Blocks);
    nextToken = response.NextToken;
  } while (nextToken);

  return allBlocks;
}

export async function performOCR(
  s3Bucket: string,
  s3Key: string,
  region: string = 'us-west-2'
): Promise<TextractResponse> {
  const textractClient = new TextractClient({ region });
  const s3Client = new S3Client({ region });

  try {
    // Start the document analysis job
    const startCommand = new StartDocumentAnalysisCommand({
      DocumentLocation: {
        S3Object: {
          Bucket: s3Bucket,
          Name: s3Key,
        },
      },
      FeatureTypes: ['FORMS', 'LAYOUT', 'SIGNATURES', 'TABLES'],
    });

    const startResponse = await textractClient.send(startCommand);

    if (!startResponse.JobId) {
      throw new Error('No job ID received from Textract');
    }

    // Poll for job completion
    await pollForCompletion(textractClient, startResponse.JobId);

    // Get all blocks with pagination
    const allBlocks = await getAllBlocks(textractClient, startResponse.JobId);

    // Process the response and organize by page
    const pages: Page[] = [];
    const blocksByPage = new Map<number, Block[]>();

    // Group blocks by page
    allBlocks.forEach((block: Block) => {
      if (block.Page) {
        const pageBlocks = blocksByPage.get(block.Page) || [];
        pageBlocks.push(block);
        blocksByPage.set(block.Page, pageBlocks);
      }
    });

    // Process each page
    for (const [pageNumber, blocks] of blocksByPage.entries()) {
      const pageText: string[] = [];
      const citations: Citation[] = [];
      const pageDates: DateInfo[] = [];

      blocks.forEach((block: Block) => {
        if (isLineBlock(block)) {
          const text = block.Text;
          pageText.push(text);

          const boundingBox = block.Geometry?.BoundingBox
            ? {
                left: block.Geometry.BoundingBox.Left || 0,
                top: block.Geometry.BoundingBox.Top || 0,
                width: block.Geometry.BoundingBox.Width || 0,
                height: block.Geometry.BoundingBox.Height || 0,
              }
            : undefined;

          const citation = {
            text,
            confidence: block.Confidence || 0,
            boundingBox,
          };

          citations.push(citation);

          // Extract dates from the text
          const dates = extractDates(
            text,
            block.Confidence || 0,
            citations.length - 1,
            boundingBox
          );
          const datesWithPage = dates.map((date) => ({
            ...date,
            pageNumber,
          }));
          pageDates.push(...datesWithPage);
        }
      });

      pages.push({
        pageNumber,
        text: pageText.join('\n'),
        citations,
        dates: pageDates,
      });
    }

    // Create distinct dates array with occurrences
    const distinctDates = pages
      .flatMap((page) => page.dates)
      .reduce<DistinctDate[]>((acc, dateInfo) => {
        const existingDate = acc.find((d) => d.date.getTime() === dateInfo.date.getTime());

        if (existingDate) {
          if (!existingDate.occurrences.includes(dateInfo.pageNumber)) {
            existingDate.occurrences.push(dateInfo.pageNumber);
          }
        } else {
          acc.push({
            date: dateInfo.date,
            text: dateInfo.text,
            confidence: dateInfo.confidence,
            boundingBox: dateInfo.boundingBox,
            occurrences: [dateInfo.pageNumber],
          });
        }

        return acc;
      }, [])
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return {
      pages,
      totalDates: distinctDates.length,
      distinctDates,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`OCR processing failed: ${error.message}`);
    }
    throw new Error('OCR processing failed with unknown error');
  }
}

const result = await performOCR('proplaintiff-test-videos', 'test.pdf');
await writeFile('ocr_result.json', JSON.stringify(result, null, 2));
