import { Document } from '@langchain/core/documents';
import { Annotation, END, MemorySaver, Send, START, StateGraph } from '@langchain/langgraph';

// Define OCR Chain
class OCRChain {
  async invoke(document: Document): Promise<Document> {
    // Implement OCR logic here
    console.log('Processing document with OCR');
    // This is a placeholder - in a real implementation, you would
    // extract text from the document using an OCR service
    return {
      ...document,
      pageContent: document.pageContent || 'Extracted text from document',
      metadata: {
        ...document.metadata,
        ocr_processed: true,
        processed_at: new Date().toISOString(),
      },
    };
  }
}

// Graph state
const StateAnnotation = Annotation.Root({
  documents: Annotation<Document[]>({
    default: () => [],
    reducer: (curr, next) => next || curr,
  }),
  processingDocuments: Annotation<Document[]>({
    default: () => [],
    reducer: (curr, next) => next || curr,
  }),
  pendingDocuments: Annotation<Document[]>({
    default: () => [],
    reducer: (curr, next) => next || curr,
  }),
  status: Annotation<string>({
    default: () => 'pending',
    reducer: (curr, next) => next || curr,
  }),
  results: Annotation<Document[]>({
    default: () => [],
    reducer: (curr, next) => [...curr, ...next],
  }),
  concurrencyLimit: Annotation<number>({
    default: () => 3, // Default concurrency limit
    reducer: (curr, next) => next || curr,
  }),
});

// Document preparation node
async function prepareDocumentsNode(state: typeof StateAnnotation.State) {
  const { documents, concurrencyLimit } = state;

  if (!documents.length) {
    return { status: 'complete' };
  }

  // Take up to concurrencyLimit documents for processing
  const processingBatch = documents.slice(0, concurrencyLimit);
  const remainingDocuments = documents.slice(concurrencyLimit);

  return {
    processingDocuments: processingBatch,
    pendingDocuments: remainingDocuments,
    status: 'processing',
  };
}

// Parallel OCR processing node
async function parallelOcrNode(state: typeof StateAnnotation.State) {
  const { processingDocuments } = state;

  if (!processingDocuments.length) {
    return state;
  }

  // Process documents in parallel using Send
  const send = new Send(
    'validate',
    processingDocuments.map((document) => ({ document }))
  );

  return send;
}

// Single document OCR and validation
async function validateNode(state: { document: Document }) {
  const { document } = state;

  const ocr = new OCRChain();
  const processedDocument = await ocr.invoke(document);

  // Implement validation logic
  console.log('Processing and validating document');
  const isValid = true; // Simplified validation

  return {
    result: isValid ? processedDocument : null,
    status: isValid ? 'valid' : 'invalid',
  };
}

// Collect results and prepare next batch
async function collectResultsNode(state: typeof StateAnnotation.State) {
  const { pendingDocuments, results } = state;

  // Check if we have more documents to process
  if (pendingDocuments.length > 0) {
    const { concurrencyLimit } = state;

    // Take the next batch of documents
    const nextBatch = pendingDocuments.slice(0, concurrencyLimit);
    const remainingDocuments = pendingDocuments.slice(concurrencyLimit);

    return {
      processingDocuments: nextBatch,
      pendingDocuments: remainingDocuments,
      status: 'processing',
    };
  }

  // If no more documents to process
  return {
    status: results.length > 0 ? 'complete' : 'failed',
  };
}

// Aggregator for validation results
async function aggregateResultsNode(
  state: typeof StateAnnotation.State,
  options: Record<string, any>
) {
  const results = options.results || [];
  const validResults = results
    .filter((r: { result: Document | null; status: string }) => r.status === 'valid' && r.result)
    .map((r: { result: Document | null; status: string }) => r.result as Document);

  return {
    results: validResults,
  };
}

// Router function to determine next step
function router(state: typeof StateAnnotation.State) {
  const { status } = state;

  if (status === 'complete') {
    return END;
  } else if (status === 'processing') {
    return 'parallelOcr';
  } else if (status === 'failed') {
    return END;
  } else {
    return 'collectResults';
  }
}

// Create and compile the graph
const graph = new StateGraph(StateAnnotation)
  .addNode('prepareDocuments', prepareDocumentsNode)
  .addNode('parallelOcr', parallelOcrNode)
  .addNode('validate', validateNode)
  .addNode('collectResults', collectResultsNode)
  .addNode('aggregateResults', aggregateResultsNode)
  .addEdge(START, 'prepareDocuments')
  .addEdge('prepareDocuments', 'parallelOcr')
  .addEdge('parallelOcr', 'aggregateResults')
  .addEdge('aggregateResults', 'collectResults')
  .addConditionalEdges('collectResults', router, {
    parallelOcr: 'parallelOcr',
    [END]: END,
  });

// Compile the graph with memory persistence
const workflow = graph.compile({
  checkpointer: new MemorySaver(),
});

// Function to run the workflow with multiple documents
export async function processDocuments(documents: Document[], concurrencyLimit?: number) {
  const result = await workflow.invoke({
    documents: documents,
    concurrencyLimit: concurrencyLimit || 3,
  });

  console.log(`Processed ${result.results.length} documents`);
  return result.results;
}
