'use client';

import { CaseDocuments } from "./components/case-documents";

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Case Documents</h1>
          <p className="text-muted-foreground">
            Manage and organize all case-related documents and files.
          </p>
        </div>
        <CaseDocuments />
      </div>
    </div>
  )
} 