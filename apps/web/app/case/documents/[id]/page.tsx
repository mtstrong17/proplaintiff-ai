'use client';

import React from 'react';
import { DocumentDetails } from '../components/document-details';

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  return (
    <div className="container mx-auto py-8 px-4">
      <DocumentDetails documentId={resolvedParams.id} />
    </div>
  );
}
