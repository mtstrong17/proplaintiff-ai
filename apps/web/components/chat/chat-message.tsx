'use client';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatMessage({ content, role, timestamp }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-full gap-2 p-4',
        role === 'assistant' ? 'bg-secondary/50' : 'bg-background'
      )}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
        {role === 'user' ? '👤' : '🤖'}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {role === 'user' ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(timestamp, 'h:mm a')}
          </span>
        </div>
        <div className="text-sm text-foreground/90">{content}</div>
      </div>
    </div>
  );
} 