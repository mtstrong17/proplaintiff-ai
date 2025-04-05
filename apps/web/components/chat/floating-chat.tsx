'use client';

import { cn } from '@/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@workspace/ui/components/sheet';
import { Maximize2, MessageCircle, Minimize2, X } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage } from './chat-message';
import { useChat } from './chat-provider';

export function FloatingChat() {
  const { isOpen, setIsOpen, messages, addMessage } = useChat();
  const [input, setInput] = useState('');
  const [isCompact, setIsCompact] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(input.trim(), 'user');
    setInput('');

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      addMessage('This is a simulated response. The actual AI integration will be implemented later.', 'assistant');
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        size="icon"
        variant="default"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  if (isCompact) {
    return (
      <div className="fixed bottom-4 right-4 w-[380px] rounded-lg border bg-background shadow-lg">
        <div className="flex items-center justify-between border-b p-2">
          <h3 className="text-sm font-semibold">AI Assistant</h3>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setIsCompact(false)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[300px] px-2">
          <div className="flex flex-col divide-y">
            {messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
                No messages yet. Start a conversation!
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="border-t p-2">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm" disabled={!input.trim()}>
              Send
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <Sheet open={true} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className={cn(
          "w-[400px] sm:w-[540px] p-0",
          "fixed inset-y-0 right-0 h-full border-l"
        )}
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-4 py-2">
            <div className="flex items-center justify-between">
              <SheetTitle>AI Assistant</SheetTitle>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setIsCompact(true)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4">
            <div className="flex flex-col divide-y">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
              {messages.length === 0 && (
                <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
                  No messages yet. Start a conversation!
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!input.trim()}>
                Send
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
} 