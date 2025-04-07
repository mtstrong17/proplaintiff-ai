'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { CaseReviewMessage } from './case-review-message';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface CaseReviewChatProps {
  caseId: string;
}

// Sample case data
const SAMPLE_CASE = {
  id: 'CASE-001',
  client: 'John Doe',
  type: 'Auto Accident',
  status: 'Active',
  filingDate: '2024-03-15',
  nextHearing: '2024-04-20',
  assignedAttorney: 'Sarah Wilson',
  lastActivity: 'Medical records requested',
};

export function CaseReviewChat({ caseId }: CaseReviewChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm here to help you analyze Case #${caseId} for ${SAMPLE_CASE.client}. This is a ${SAMPLE_CASE.type} case filed on ${SAMPLE_CASE.filingDate}. What would you like to know about the case?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Based on the case information:\n\nClient: ${SAMPLE_CASE.client}\nCase Type: ${SAMPLE_CASE.type}\nStatus: ${SAMPLE_CASE.status}\nNext Hearing: ${SAMPLE_CASE.nextHearing}\nLast Activity: ${SAMPLE_CASE.lastActivity}\n\nI'll help analyze your question about "${input.trim()}". What specific aspects would you like me to focus on?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">Case Review</h1>
        <p className="text-sm text-muted-foreground">
          Reviewing case: {SAMPLE_CASE.client} - {SAMPLE_CASE.type}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <CaseReviewMessage
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
} 