'use client';

import { CaseReviewChat } from '@/components/case-review/case-review-chat';
import { useStore } from '@/lib/store';
import { redirect } from 'next/navigation';

export default function CaseReviewPage() {
  const { selectedCaseId } = useStore();

  if (!selectedCaseId) {
    redirect('/cases');
  }

  return (
    <main className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col overflow-hidden">
        <CaseReviewChat caseId={selectedCaseId} />
      </div>
    </main>
  );
} 