import { z } from 'zod';

// Demand Letter Types
export const DemandLetterVersion = z.object({
  id: z.string(),
  version: z.number(),
  content: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  status: z.enum(['draft', 'sent', 'approved']),
});

export const DemandLetter = z.object({
  id: z.string(),
  caseId: z.string(),
  currentVersion: z.number(),
  versions: z.array(DemandLetterVersion),
});

// Case Type
export const Case = z.object({
  id: z.string(),
  client: z.string(),
  type: z.string(),
  status: z.string(),
  filingDate: z.string(),
  nextHearing: z.string().nullable(),
  assignedAttorney: z.string(),
  lastActivity: z.string(),
  demandLetter: DemandLetter.nullable(),
});

// Type Exports
export type DemandLetterVersionType = z.infer<typeof DemandLetterVersion>;
export type DemandLetterType = z.infer<typeof DemandLetter>;
export type CaseType = z.infer<typeof Case>;

// Case Status Constants
export const CASE_STATUSES = ['Active', 'Discovery', 'Settlement', 'Closed'] as const;
export type CaseStatus = (typeof CASE_STATUSES)[number];
