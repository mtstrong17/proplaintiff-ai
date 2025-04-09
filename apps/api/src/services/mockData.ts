import { CaseType, DemandLetterType } from '../types/case.js';

// Sample demand letter data
export const SAMPLE_DEMAND_LETTERS: Record<string, DemandLetterType> = {
  'CASE-001': {
    id: 'DL-001',
    caseId: 'CASE-001',
    currentVersion: 2,
    versions: [
      {
        id: 'DLV-001',
        version: 1,
        content: 'Initial demand letter draft...',
        createdAt: '2024-03-20',
        createdBy: 'Sarah Wilson',
        status: 'approved',
      },
      {
        id: 'DLV-002',
        version: 2,
        content: 'Updated demand letter with new medical records...',
        createdAt: '2024-03-25',
        createdBy: 'Sarah Wilson',
        status: 'draft',
      },
    ],
  },
};

// Sample cases data
export const SAMPLE_CASES: CaseType[] = [
  {
    id: 'CASE-001',
    client: 'John Doe',
    type: 'Auto Accident',
    status: 'Active',
    filingDate: '2024-03-15',
    nextHearing: '2024-04-20',
    assignedAttorney: 'Sarah Wilson',
    lastActivity: 'Medical records requested',
    demandLetter: SAMPLE_DEMAND_LETTERS['CASE-001'] ?? null,
  },
  {
    id: 'CASE-002',
    client: 'Jane Smith',
    type: 'Slip and Fall',
    status: 'Discovery',
    filingDate: '2024-02-28',
    nextHearing: '2024-05-10',
    assignedAttorney: 'Michael Brown',
    lastActivity: 'Deposition scheduled',
    demandLetter: null,
  },
  {
    id: 'CASE-003',
    client: 'Bob Johnson',
    type: 'Medical Malpractice',
    status: 'Settlement',
    filingDate: '2024-01-20',
    nextHearing: null,
    assignedAttorney: 'Emily Davis',
    lastActivity: 'Settlement offer received',
    demandLetter: null,
  },
];
