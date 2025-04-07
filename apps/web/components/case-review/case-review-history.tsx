'use client';

import { cn } from '@/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { MessageSquarePlus } from 'lucide-react';
import { useState } from 'react';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive?: boolean;
}

// Sample chat sessions
const SAMPLE_SESSIONS: ChatSession[] = [
  {
    id: '1',
    title: 'Initial Case Analysis',
    lastMessage: 'Reviewing medical records and liability assessment',
    timestamp: new Date('2024-03-20T10:00:00'),
  },
  {
    id: '2',
    title: 'Settlement Strategy',
    lastMessage: 'Discussing potential settlement ranges',
    timestamp: new Date('2024-03-19T15:30:00'),
  },
  {
    id: '3',
    title: 'Evidence Review',
    lastMessage: 'Analyzing witness statements and police report',
    timestamp: new Date('2024-03-18T14:00:00'),
  },
  {
    id: '4',
    title: 'Timeline Analysis',
    lastMessage: 'Creating detailed case timeline',
    timestamp: new Date('2024-03-17T11:00:00'),
  },
];

export function CaseReviewHistory() {
  const [sessions, setSessions] = useState<ChatSession[]>(SAMPLE_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>(SAMPLE_SESSIONS[0]?.id || '');

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      lastMessage: 'Start a new conversation',
      timestamp: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleNewChat}
        >
          <MessageSquarePlus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg transition-colors',
                'hover:bg-secondary/80',
                session.id === activeSessionId ? 'bg-secondary' : 'bg-transparent'
              )}
            >
              <div className="text-sm font-medium truncate">{session.title}</div>
              <div className="text-xs text-muted-foreground truncate">
                {session.lastMessage}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 