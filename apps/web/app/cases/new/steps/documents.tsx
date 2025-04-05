'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { FileUp, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

interface DocumentsStepProps {
  formData: {
    documents: File[];
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  onSubmit: () => void;
}

export function DocumentsStep({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}: DocumentsStepProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    setFormData({
      ...formData,
      documents: [...formData.documents, ...files],
    });
  };

  const removeFile = (index: number) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({ ...formData, documents: newDocuments });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag and drop files here, or click to select files
          </p>
          <Label
            htmlFor="file-upload"
            className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Choose Files
          </Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      </div>

      {formData.documents.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Uploaded Files</h3>
          <div className="rounded-lg border">
            {formData.documents.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b p-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <FileUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
} 