'use client';

import { CaseReviewChat } from '@/components/case-review/case-review-chat';
import { CaseReviewHistory } from '@/components/case-review/case-review-history';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    caseId: string;
  }>;
}

export default function CaseReviewPage({ params }: PageProps) {
  const { caseId } = use(params);

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="flex-1">
        <CaseReviewChat caseId={caseId} />
      </div>
      <div className="w-[300px] border-l">
        <CaseReviewHistory />
      </div>
    </div>
  );
} 