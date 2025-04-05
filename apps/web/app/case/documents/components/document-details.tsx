'use client';

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
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
  Upload
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Citation = {
  id: string;
  page: number;
  text: string;
  context: string;
  addedBy: string;
  addedAt: Date;
  type: "key-fact" | "evidence" | "argument" | "reference";
}

const sampleDocument = {
  id: "1",
  name: "Initial Medical Report.pdf",
  type: "PDF",
  category: "medical",
  dateAdded: new Date("2024-02-15"),
  lastModified: new Date("2024-02-15"),
  size: "2.4 MB",
  tags: ["medical", "initial-assessment"],
  status: "final",
  author: "Dr. Sarah Johnson",
  facility: "City General Hospital",
  summary: "Initial medical assessment following motor vehicle accident. Patient presents with whiplash and contusions. Recommended treatment includes pain management and physical therapy.",
  citations: [
    {
      id: "c1",
      page: 1,
      text: "Patient presents with severe neck pain and limited range of motion consistent with whiplash injury",
      context: "Initial Assessment",
      addedBy: "John Smith",
      addedAt: new Date("2024-02-16"),
      type: "key-fact"
    },
    {
      id: "c2",
      page: 2,
      text: "X-ray results show no fractures but significant soft tissue damage in cervical region",
      context: "Diagnostic Results",
      addedBy: "John Smith",
      addedAt: new Date("2024-02-16"),
      type: "evidence"
    },
    {
      id: "c3",
      page: 3,
      text: "Recommended course of physical therapy: 2-3 sessions per week for 6-8 weeks",
      context: "Treatment Plan",
      addedBy: "Jane Doe",
      addedAt: new Date("2024-02-17"),
      type: "reference"
    }
  ] as Citation[],
  relatedDocuments: [
    {
      id: "2",
      name: "Follow-up Assessment.pdf",
      type: "PDF",
      category: "medical"
    },
    {
      id: "3",
      name: "Physical Therapy Plan.pdf",
      type: "PDF",
      category: "medical"
    }
  ]
};

const citationTypeColors = {
  "key-fact": "bg-blue-50 text-blue-700 border-blue-200",
  "evidence": "bg-green-50 text-green-700 border-green-200",
  "argument": "bg-purple-50 text-purple-700 border-purple-200",
  "reference": "bg-orange-50 text-orange-700 border-orange-200"
};

export function DocumentDetails({ documentId }: { documentId: string }) {
  const [activeTab, setActiveTab] = useState("summary");

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
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="citations">Citations</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
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
                  {sampleDocument.relatedDocuments.map((doc) => (
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
                {sampleDocument.citations.map((citation) => (
                  <Card key={citation.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${citationTypeColors[citation.type]}`}>
                            {citation.type.split("-").map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(" ")}
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