import { z } from 'zod';
import { publicProcedure, router } from '../trpc.js';

// Define the Case type to match the frontend
const DemandLetterVersion = z.object({
  id: z.string(),
  version: z.number(),
  content: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  status: z.enum(['draft', 'sent', 'approved']),
});

const DemandLetter = z.object({
  id: z.string(),
  caseId: z.string(),
  currentVersion: z.number(),
  versions: z.array(DemandLetterVersion),
});

// Update Case type to include demand letter
const Case = z.object({
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

type DemandLetterVersionType = z.infer<typeof DemandLetterVersion>;
type DemandLetterType = z.infer<typeof DemandLetter>;
type CaseType = z.infer<typeof Case>;

// Sample demand letter data
const SAMPLE_DEMAND_LETTERS: Record<string, DemandLetterType> = {
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
        status: 'approved' as const,
      },
      {
        id: 'DLV-002',
        version: 2,
        content: 'Updated demand letter with new medical records...',
        createdAt: '2024-03-25',
        createdBy: 'Sarah Wilson',
        status: 'draft' as const,
      },
    ],
  },
};

// Update sample cases to include demand letters
const SAMPLE_CASES: CaseType[] = [
  {
    id: 'CASE-001',
    client: 'John Doe',
    type: 'Auto Accident',
    status: 'Active',
    filingDate: '2024-03-15',
    nextHearing: '2024-04-20',
    assignedAttorney: 'Sarah Wilson',
    lastActivity: 'Medical records requested',
    demandLetter: SAMPLE_DEMAND_LETTERS['CASE-001'],
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

export const casesRouter = router({
  getAll: publicProcedure
    .input(
      z
        .object({
          status: z.string().optional(),
          search: z.string().optional(),
        })
        .optional()
    )
    .output(z.array(Case))
    .query(({ input }) => {
      let filteredCases = [...SAMPLE_CASES];

      if (input?.status && input.status.length > 0) {
        filteredCases = filteredCases.filter(
          (case_) => case_.status.toLowerCase() === input.status!.toLowerCase()
        );
      }

      if (input?.search && input.search.length > 0) {
        const searchLower = input.search.toLowerCase();
        filteredCases = filteredCases.filter(
          (case_) =>
            case_.client.toLowerCase().includes(searchLower) ||
            case_.id.toLowerCase().includes(searchLower) ||
            case_.type.toLowerCase().includes(searchLower)
        );
      }

      return filteredCases;
    }),

  getById: publicProcedure
    .input(z.string())
    .output(Case.nullable())
    .query(({ input }) => {
      return SAMPLE_CASES.find((case_) => case_.id === input) || null;
    }),

  getStatuses: publicProcedure.output(z.array(z.string())).query(() => {
    return ['Active', 'Discovery', 'Settlement', 'Closed'];
  }),

  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
    const index = SAMPLE_CASES.findIndex((case_) => case_.id === input.id);
    if (index !== -1) {
      SAMPLE_CASES.splice(index, 1);
      return { success: true };
    }
    throw new Error('Case not found');
  }),

  getDemandLetter: publicProcedure
    .input(z.string())
    .output(DemandLetter.nullable())
    .query(({ input: caseId }) => {
      const demandLetter = SAMPLE_DEMAND_LETTERS[caseId];
      return demandLetter ?? null;
    }),

  createDemandLetterVersion: publicProcedure
    .input(
      z.object({
        caseId: z.string(),
        content: z.string(),
        createdBy: z.string(),
      })
    )
    .mutation(({ input }) => {
      const demandLetter = SAMPLE_DEMAND_LETTERS[input.caseId];
      const newVersion: DemandLetterVersionType = {
        id: `DLV-${Math.random().toString(36).substr(2, 9)}`,
        version: demandLetter ? demandLetter.currentVersion + 1 : 1,
        content: input.content,
        createdAt: new Date().toISOString(),
        createdBy: input.createdBy,
        status: 'draft',
      };

      if (!demandLetter) {
        SAMPLE_DEMAND_LETTERS[input.caseId] = {
          id: `DL-${Math.random().toString(36).substr(2, 9)}`,
          caseId: input.caseId,
          currentVersion: 1,
          versions: [newVersion],
        };
      } else {
        demandLetter.versions.push(newVersion);
        demandLetter.currentVersion = newVersion.version;
      }

      return newVersion;
    }),

  updateDemandLetterStatus: publicProcedure
    .input(
      z.object({
        caseId: z.string(),
        versionId: z.string(),
        status: z.enum(['draft', 'sent', 'approved']),
      })
    )
    .mutation(({ input }) => {
      const demandLetter = SAMPLE_DEMAND_LETTERS[input.caseId];
      if (!demandLetter) {
        throw new Error('Demand letter not found');
      }

      const version = demandLetter.versions.find(
        (v: DemandLetterVersionType) => v.id === input.versionId
      );
      if (!version) {
        throw new Error('Version not found');
      }

      version.status = input.status;
      return version;
    }),
});
