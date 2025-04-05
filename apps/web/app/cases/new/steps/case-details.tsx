'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { Textarea } from '@workspace/ui/components/textarea';
import { useState } from 'react';

interface CaseDetailsStepProps {
  formData: {
    caseType: string;
    incidentDate: string;
    description: string;
    jurisdiction: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  onSubmit: () => void;
}

const CASE_TYPES = [
  'Personal Injury',
  'Medical Malpractice',
  'Product Liability',
  'Wrongful Death',
  'Workers Compensation',
  'Other',
];

export function CaseDetailsStep({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}: CaseDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.caseType) {
      newErrors.caseType = 'Case type is required';
    }

    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Incident date is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.jurisdiction.trim()) {
      newErrors.jurisdiction = 'Jurisdiction is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="caseType">Case Type</Label>
          <Select
            value={formData.caseType}
            onValueChange={(value) =>
              setFormData({ ...formData, caseType: value })
            }
          >
            <SelectTrigger id="caseType">
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              {CASE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.caseType && (
            <p className="text-sm text-destructive">{errors.caseType}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="incidentDate">Incident Date</Label>
          <Input
            id="incidentDate"
            type="date"
            value={formData.incidentDate}
            onChange={(e) =>
              setFormData({ ...formData, incidentDate: e.target.value })
            }
          />
          {errors.incidentDate && (
            <p className="text-sm text-destructive">{errors.incidentDate}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="description">Case Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Provide a detailed description of the case"
            className="h-32"
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="jurisdiction">Jurisdiction</Label>
          <Input
            id="jurisdiction"
            value={formData.jurisdiction}
            onChange={(e) =>
              setFormData({ ...formData, jurisdiction: e.target.value })
            }
            placeholder="Enter the jurisdiction for this case"
          />
          {errors.jurisdiction && (
            <p className="text-sm text-destructive">{errors.jurisdiction}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
} 