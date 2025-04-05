'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Progress } from '@workspace/ui/components/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CaseDetailsStep } from './steps/case-details';
import { ClientInfoStep } from './steps/client-info';
import { DocumentsStep } from './steps/documents';
import { ReviewStep } from './steps/review';

interface FormData {
  // Client Information
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  
  // Case Details
  caseType: string;
  incidentDate: string;
  description: string;
  jurisdiction: string;
  
  // Documents
  documents: File[];
}

const STEPS = [
  { title: 'Client Information', component: ClientInfoStep },
  { title: 'Case Details', component: CaseDetailsStep },
  { title: 'Documents', component: DocumentsStep },
  { title: 'Review', component: ReviewStep },
];

export default function NewCasePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    caseType: '',
    incidentDate: '',
    description: '',
    jurisdiction: '',
    documents: [],
  });

  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Implement case creation logic
    router.push('/cases');
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex h-full flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/cases')}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">New Case</h2>
            <p className="text-muted-foreground">
              {STEPS[currentStep].title} ({currentStep + 1} of {STEPS.length})
            </p>
          </div>
        </div>

        <Progress value={progress} className="w-full" />

        <Card className="flex-1">
          <div className="flex flex-col gap-8 p-6">
            <CurrentStepComponent
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onBack={handleBack}
              isLastStep={currentStep === STEPS.length - 1}
              onSubmit={handleSubmit}
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 