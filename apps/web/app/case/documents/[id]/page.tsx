'use client';

import { DocumentDetails } from '../components/document-details';

export default function DocumentPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <DocumentDetails documentId={params.id} />
    </div>
  );
}
