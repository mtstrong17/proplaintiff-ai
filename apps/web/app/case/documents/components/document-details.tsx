'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import {
  ArrowLeft,
  Calendar,
  Download,
  FileText,
  Link2,
  MessageSquare,
  MoreHorizontal,
  Share2,
  Tag,
  Timer,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Citation = {
  id: string;
  page: number;
  text: string;
  context: string;
  addedBy: string;
  addedAt: Date;
  type: 'key-fact' | 'evidence' | 'argument' | 'reference';
};

type Document = {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'jpg' | 'png' | 'mp4' | 'mov';
  category: 'medical' | 'legal' | 'evidence' | 'correspondence' | 'billing';
  dateAdded: Date;
  lastModified: Date;
  size: string;
  tags: string[];
  status: 'draft' | 'final' | 'archived';
  url: string;
  author?: string;
  facility?: string;
  summary?: string;
  citations?: Citation[];
  relatedDocuments?: Array<{
    id: string;
    name: string;
    type: Document['type'];
    category: Document['category'];
  }>;
};

const sampleDocument: Document = {
  id: '1',
  name: 'Initial Medical Report.pdf',
  type: 'pdf',
  category: 'medical',
  dateAdded: new Date('2024-02-15'),
  lastModified: new Date('2024-02-15'),
  size: '2.4 MB',
  tags: ['medical', 'initial-assessment'],
  status: 'final',
  url: '/sample-documents/initial-medical-report.pdf',
  author: 'Dr. Sarah Johnson',
  facility: 'City General Hospital',
  summary: 'Initial medical assessment following motor vehicle accident. Patient presents with whiplash and contusions. Recommended treatment includes pain management and physical therapy.',
  citations: [
    {
      id: 'c1',
      page: 1,
      text: 'Patient presents with severe neck pain and limited range of motion consistent with whiplash injury',
      context: 'Initial Assessment',
      addedBy: 'John Smith',
      addedAt: new Date('2024-02-16'),
      type: 'key-fact',
    },
    {
      id: 'c2',
      page: 2,
      text: 'X-ray results show no fractures but significant soft tissue damage in cervical region',
      context: 'Diagnostic Results',
      addedBy: 'John Smith',
      addedAt: new Date('2024-02-16'),
      type: 'evidence',
    },
    {
      id: 'c3',
      page: 3,
      text: 'Recommended course of physical therapy: 2-3 sessions per week for 6-8 weeks',
      context: 'Treatment Plan',
      addedBy: 'Jane Doe',
      addedAt: new Date('2024-02-17'),
      type: 'reference',
    },
  ],
  relatedDocuments: [
    {
      id: '2',
      name: 'Follow-up Assessment.pdf',
      type: 'pdf',
      category: 'medical',
    },
    {
      id: '3',
      name: 'Physical Therapy Plan.pdf',
      type: 'pdf',
      category: 'medical',
    },
  ],
};

const citationTypeColors = {
  'key-fact': 'bg-blue-50 text-blue-700 border-blue-200',
  evidence: 'bg-green-50 text-green-700 border-green-200',
  argument: 'bg-purple-50 text-purple-700 border-purple-200',
  reference: 'bg-orange-50 text-orange-700 border-orange-200',
};

const documentViewers = {
  pdf: ({ url }: { url: string }) => (
    <div className="w-full h-[600px] border rounded-lg flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">PDF Viewer Placeholder</p>
        <p className="text-sm text-muted-foreground">URL: {url}</p>
      </div>
    </div>
  ),
  docx: ({ url }: { url: string }) => (
    <div className="w-full h-[600px] border rounded-lg flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">Word Document Viewer Placeholder</p>
        <p className="text-sm text-muted-foreground">URL: {url}</p>
      </div>
    </div>
  ),
  txt: ({ url }: { url: string }) => (
    <div className="w-full h-[600px] border rounded-lg flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">Text Viewer Placeholder</p>
        <p className="text-sm text-muted-foreground">URL: {url}</p>
      </div>
    </div>
  ),
  jpg: ({ url }: { url: string }) => (
    <div className="w-full h-[600px] border rounded-lg flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <img
          src={url}
          alt="Document"
          className="max-w-full max-h-full object-contain"
        />
        <p className="text-sm text-muted-foreground">Image Viewer</p>
      </div>
    </div>
  ),
  png: ({ url }: { url: string }) => (
    <div className="w-full h-[600px] border rounded-lg flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <img
          src={url}
          alt="Document"
          className="max-w-full max-h-full object-contain"
        />
        <p className="text-sm text-muted-foreground">Image Viewer</p>
      </div>
    </div>
  ),
  mp4: ({ url }: { url: string }) => (
    <div className="w-full h-[600px] border rounded-lg flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <video
          src={url}
          controls
          className="max-w-full max-h-full"
        />
        <p className="text-sm text-muted-foreground">Video Player</p>
      </div>
    </div>
  ),
  mov: ({ url }: { url: string }) => (
    <div className="w-full h-[600px] border rounded-lg flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <video
          src={url}
          controls
          className="max-w-full max-h-full"
        />
        <p className="text-sm text-muted-foreground">Video Player</p>
      </div>
    </div>
  ),
};

const getDocumentTabs = (type: Document['type']) => {
  const baseTabs = ['viewer', 'summary', 'citations', 'versions', 'activity'];
  
  switch (type) {
    case 'pdf':
    case 'docx':
    case 'txt':
      return baseTabs;
    case 'jpg':
    case 'png':
      return ['viewer', 'metadata', 'citations', 'versions', 'activity'];
    case 'mp4':
    case 'mov':
      return ['viewer', 'transcript', 'metadata', 'versions', 'activity'];
    default:
      return baseTabs;
  }
};

export function DocumentDetails({ documentId }: { documentId: string }) {
  const [activeTab, setActiveTab] = useState('viewer');
  const [document, setDocument] = useState<Document>({
    ...sampleDocument,
    type: 'pdf',
    url: '/sample-documents/initial-medical-report.pdf',
  });

  const tabs = getDocumentTabs(document.type);
  const Viewer = documentViewers[document.type];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/case/documents">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-muted-foreground" />
              {sampleDocument.name}
            </h1>
            <p className="text-muted-foreground">
              {sampleDocument.facility} • {sampleDocument.author}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload New Version
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="viewer" className="mt-4">
              <Card className="p-4">
                <Viewer url={document.url} />
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Document Summary</h2>
                <p className="text-muted-foreground">{sampleDocument.summary}</p>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6">
                  <h3 className="text-sm font-medium mb-4">Document Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium capitalize">{sampleDocument.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium">{sampleDocument.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium">{sampleDocument.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium capitalize">{sampleDocument.status}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-sm font-medium mb-4">Dates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Added</span>
                      <span className="font-medium ml-auto">
                        {sampleDocument.dateAdded.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Modified</span>
                      <span className="font-medium ml-auto">
                        {sampleDocument.lastModified.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Related Documents</h3>
                  <Button variant="ghost" size="sm">
                    <Link2 className="mr-2 h-4 w-4" />
                    Link Document
                  </Button>
                </div>
                <div className="space-y-2">
                  {sampleDocument.relatedDocuments?.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {doc.category}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="metadata" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Image Metadata</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Technical Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Resolution</span>
                        <span className="font-medium">1920x1080</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Format</span>
                        <span className="font-medium">{document.type.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Size</span>
                        <span className="font-medium">{document.size}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Capture Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Date Taken</span>
                        <span className="font-medium">{document.dateAdded.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Device</span>
                        <span className="font-medium">iPhone 13 Pro</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">Intersection of Main St & 1st Ave</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Video Transcript</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      [00:00] Officer: Can you tell me what happened here?<br />
                      [00:05] Witness: Yes, I saw the red car run the red light and hit the blue car.<br />
                      [00:12] Officer: Did you see the light change?<br />
                      [00:15] Witness: Yes, it had been red for at least 3 seconds before the collision.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="citations" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Citations</h2>
                  <p className="text-sm text-muted-foreground">
                    Key excerpts and citations from the document.
                  </p>
                </div>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add Citation
                </Button>
              </div>

              <div className="space-y-4">
                {sampleDocument.citations?.map((citation) => (
                  <Card key={citation.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${citationTypeColors[citation.type]}`}
                          >
                            {citation.type
                              .split('-')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Page {citation.page}
                          </span>
                        </div>
                        <blockquote className="text-sm border-l-2 pl-4 italic">
                          "{citation.text}"
                        </blockquote>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Added by {citation.addedBy}</span>
                          <span>•</span>
                          <span>{citation.addedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {sampleDocument.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 bg-muted rounded-lg text-xs"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </div>
              ))}
              <Button variant="ghost" size="sm" className="h-6">
                Add Tag
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
