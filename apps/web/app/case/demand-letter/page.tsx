'use client';

import { RichTextEditor } from '@/components/editor/rich-text-editor';
import { useStore } from '@/lib/store';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import { Separator } from '@workspace/ui/components/separator';
import { Download, FileText, Mail, Save, Wand2 } from 'lucide-react';
import { useState } from 'react';

const STYLE_GUIDES = [
  { id: 'standard', name: 'Standard Demand Letter' },
  { id: 'aggressive', name: 'Aggressive Tone' },
  { id: 'conciliatory', name: 'Conciliatory Tone' },
  { id: 'detailed', name: 'Detailed Medical Focus' },
];

export default function DemandLetterPage() {
  const { selectedCaseId } = useStore();
  const [newContent, setNewContent] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('standard');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState('');

  const trpc = useTRPC();

  const { data: demandLetter, refetch } = useQuery(
    trpc.cases.getDemandLetter.queryOptions(selectedCaseId || '')
  );

  const createVersionMutation = useMutation(trpc.cases.createDemandLetterVersion.mutationOptions());
  const updateStatusMutation = useMutation(trpc.cases.updateDemandLetterStatus.mutationOptions());

  const handleCreateVersion = async () => {
    if (!newContent.trim() || !selectedCaseId) return;
    try {
      await createVersionMutation.mutateAsync({
        caseId: selectedCaseId,
        content: newContent,
        createdBy: 'Current User', // In a real app, this would come from the auth context
      });
      setNewContent('');
      refetch();
    } catch (error) {
      console.error('Failed to create version:', error);
    }
  };

  const handleUpdateStatus = async (versionId: string, status: 'draft' | 'sent' | 'approved') => {
    if (!selectedCaseId) return;
    try {
      await updateStatusMutation.mutateAsync({
        caseId: selectedCaseId,
        versionId,
        status,
      });
      refetch();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleAddRecipient = (email: string) => {
    if (email && !recipients.includes(email) && email.includes('@')) {
      setRecipients([...recipients, email]);
      setRecipientInput('');
    }
  };

  const handleRemoveRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddRecipient(recipientInput.trim());
    }
  };

  const handleGenerateDemand = async () => {
    // TODO: Implement AI generation based on style guide
    setNewContent(`
      <h2>Demand Letter</h2>
      <p>Dear [Insurance Company],</p>
      <p>This letter serves as a formal demand for compensation regarding our client's personal injury claim...</p>
      <h3>Incident Details</h3>
      <p>On [Date], our client suffered significant injuries as a result of...</p>
      <h3>Medical Treatment</h3>
      <ul>
        <li>Emergency room visit at [Hospital]</li>
        <li>Follow-up care with Dr. [Name]</li>
        <li>Physical therapy sessions</li>
      </ul>
      <h3>Damages</h3>
      <p>The total damages in this case amount to...</p>
      <blockquote>We demand settlement in the amount of [Amount] within 30 days of this letter.</blockquote>
      <p>Sincerely,<br>[Attorney Name]</p>
    `);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500';
      case 'sent':
        return 'bg-blue-500';
      case 'approved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!selectedCaseId) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>No Case Selected</CardTitle>
            <CardDescription>Please select a case to view its demand letter.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Form */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Demand Letter Settings</CardTitle>
              <CardDescription>Configure and generate your demand letter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Style Guide</label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style guide" />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLE_GUIDES.map((style) => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Recipients</label>
                <div className="flex flex-wrap gap-2 rounded-md border p-2">
                  {recipients.map((email) => (
                    <Badge key={email} variant="secondary" className="gap-1">
                      <Mail className="h-3 w-3" />
                      {email}
                      <button
                        onClick={() => handleRemoveRecipient(email)}
                        className="ml-1 rounded-full hover:bg-accent"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <input
                    type="email"
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => handleAddRecipient(recipientInput.trim())}
                    placeholder="Add email and press Enter"
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>

              <Separator />

              <Button onClick={handleGenerateDemand} className="w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Demand Letter
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Previous versions of this demand letter</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {demandLetter?.versions.map((version) => (
                    <div
                      key={version.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Version {version.version}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(version.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(version.status)}>
                        {version.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Editor */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Demand Letter Editor
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCreateVersion}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Version
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    // Create a blob from the content
                    const blob = new Blob([newContent], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `demand-letter-${new Date().toISOString().split('T')[0]}.html`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor content={newContent} onChange={setNewContent} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 