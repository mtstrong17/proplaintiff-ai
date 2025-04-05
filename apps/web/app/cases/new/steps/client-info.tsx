'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useState } from 'react';

interface ClientInfoStepProps {
  formData: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientAddress: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  onSubmit: () => void;
}

export function ClientInfoStep({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}: ClientInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Invalid email format';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Phone number is required';
    }

    if (!formData.clientAddress.trim()) {
      newErrors.clientAddress = 'Address is required';
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
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={formData.clientName}
            onChange={(e) =>
              setFormData({ ...formData, clientName: e.target.value })
            }
            placeholder="Enter client's full name"
          />
          {errors.clientName && (
            <p className="text-sm text-destructive">{errors.clientName}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="clientEmail">Email</Label>
          <Input
            id="clientEmail"
            type="email"
            value={formData.clientEmail}
            onChange={(e) =>
              setFormData({ ...formData, clientEmail: e.target.value })
            }
            placeholder="Enter client's email"
          />
          {errors.clientEmail && (
            <p className="text-sm text-destructive">{errors.clientEmail}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="clientPhone">Phone Number</Label>
          <Input
            id="clientPhone"
            type="tel"
            value={formData.clientPhone}
            onChange={(e) =>
              setFormData({ ...formData, clientPhone: e.target.value })
            }
            placeholder="Enter client's phone number"
          />
          {errors.clientPhone && (
            <p className="text-sm text-destructive">{errors.clientPhone}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="clientAddress">Address</Label>
          <Input
            id="clientAddress"
            value={formData.clientAddress}
            onChange={(e) =>
              setFormData({ ...formData, clientAddress: e.target.value })
            }
            placeholder="Enter client's address"
          />
          {errors.clientAddress && (
            <p className="text-sm text-destructive">{errors.clientAddress}</p>
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