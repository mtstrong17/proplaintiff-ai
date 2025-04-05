import { z } from 'zod';
import { publicProcedure, router } from '../trpc.js';

// Define the Case type to match the frontend
const Case = z.object({
  id: z.string(),
  client: z.string(),
  type: z.string(),
  status: z.string(),
  filingDate: z.string(),
  nextHearing: z.string().nullable(),
  assignedAttorney: z.string(),
  lastActivity: z.string(),
});

// Sample data - In a real app, this would come from your database
const SAMPLE_CASES = [
  {
    id: 'CASE-001',
    client: 'John Doe',
    type: 'Auto Accident',
    status: 'Active',
    filingDate: '2024-03-15',
    nextHearing: '2024-04-20',
    assignedAttorney: 'Sarah Wilson',
    lastActivity: 'Medical records requested',
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
});
