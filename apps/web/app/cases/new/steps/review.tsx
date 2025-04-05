'use client';

import { Button } from '@workspace/ui/components/button';
import { FileUp } from 'lucide-react';

interface ReviewStepProps {
  formData: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientAddress: string;
    caseType: string;
    incidentDate: string;
    description: string;
    jurisdiction: string;
    documents: File[];
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  onSubmit: () => void;
}

export function ReviewStep({
  formData,
  onBack,
  onSubmit,
}: ReviewStepProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Client Information</h3>
          <div className="rounded-lg border p-4">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">Name</dt>
                <dd className="text-sm font-medium">{formData.clientName}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Email</dt>
                <dd className="text-sm font-medium">{formData.clientEmail}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Phone</dt>
                <dd className="text-sm font-medium">{formData.clientPhone}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Address</dt>
                <dd className="text-sm font-medium">{formData.clientAddress}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Case Details</h3>
          <div className="rounded-lg border p-4">
            <dl className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Case Type</dt>
                  <dd className="text-sm font-medium">{formData.caseType}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Incident Date</dt>
                  <dd className="text-sm font-medium">
                    {formData.incidentDate ? formatDate(formData.incidentDate) : 'Not specified'}
                  </dd>
                </div>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Jurisdiction</dt>
                <dd className="text-sm font-medium">{formData.jurisdiction}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Description</dt>
                <dd className="text-sm font-medium whitespace-pre-wrap">
                  {formData.description}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Documents</h3>
          <div className="rounded-lg border p-4">
            {formData.documents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No documents uploaded</p>
            ) : (
              <ul className="space-y-2">
                {formData.documents.map((file, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <FileUp className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{file.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Create Case</Button>
      </div>
    </div>
  );
} 