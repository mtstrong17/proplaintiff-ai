'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Textarea } from '@workspace/ui/components/textarea';
import { FileText, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { api } from '../../../../trpc/react';
import type { DemandLetterVersionType } from '../../../../types/demand-letter';

export function DemandLetter() {
  const params = useParams<{ id: string }>();
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState('');

  const utils = api.useUtils();
  const { data: demandLetter } = api.cases.getDemandLetter.useQuery(params.id);
  const { mutate: createVersion } = api.cases.createDemandLetterVersion.useMutation({
    onSuccess: () => {
      setIsCreating(false);
      setNewContent('');
      utils.cases.getDemandLetter.invalidate(params.id);
    },
  });
  const { mutate: updateStatus } = api.cases.updateDemandLetterStatus.useMutation({
    onSuccess: () => {
      utils.cases.getDemandLetter.invalidate(params.id);
    },
  });

  const handleCreateVersion = () => {
    if (!newContent.trim()) return;
    createVersion({
      caseId: params.id,
      content: newContent,
      createdBy: 'Current User', // In a real app, this would come from the auth context
    });
  };

  const handleUpdateStatus = (versionId: string, status: 'draft' | 'sent' | 'approved') => {
    updateStatus({
      caseId: params.id,
      versionId,
      status,
    });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Demand Letter
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreating(true)}
            disabled={isCreating}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Version
          </Button>
        </CardTitle>
        <CardDescription>
          {demandLetter
            ? `Version ${demandLetter.currentVersion} of the demand letter`
            : 'No demand letter created yet'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isCreating && (
          <div className="mb-6 space-y-4">
            <Textarea
              placeholder="Enter the content of the new demand letter version..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="min-h-[200px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateVersion}>Create Version</Button>
            </div>
          </div>
        )}

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {demandLetter?.versions.map((version: DemandLetterVersionType) => (
              <Card key={version.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">Version {version.version}</h4>
                      <Badge variant="secondary" className={getStatusColor(version.status)}>
                        {version.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {version.status === 'draft' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(version.id, 'sent')}
                          >
                            Mark as Sent
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(version.id, 'approved')}
                          >
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created by {version.createdBy} on{' '}
                    {new Date(version.createdAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm">{version.content}</pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 