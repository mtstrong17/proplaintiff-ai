'use client';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Bot, User2 } from 'lucide-react';

interface CaseReviewMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function CaseReviewMessage({ role, content, timestamp }: CaseReviewMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-4 p-4',
        role === 'assistant' ? 'bg-secondary/50' : 'bg-background'
      )}
    >
      <div className="flex-shrink-0">
        {role === 'user' ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <User2 className="h-5 w-5 text-primary-foreground" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <Bot className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {role === 'user' ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(timestamp, 'h:mm a')}
          </span>
        </div>
        <div className="prose prose-sm max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
} 