import { z } from 'zod';
import { publicProcedure, router } from '../trpc.js';

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
    insuranceProvider: 'State Farm',
    lastActivity: 'Medical records requested',
    lastUpdated: '2024-04-04',
  },
  {
    id: 'CASE-002',
    client: 'Jane Smith',
    type: 'Slip and Fall',
    status: 'Discovery',
    filingDate: '2024-02-28',
    nextHearing: '2024-05-10',
    assignedAttorney: 'Michael Brown',
    insuranceProvider: 'Allstate',
    lastActivity: 'Deposition scheduled',
    lastUpdated: '2024-04-03',
  },
  {
    id: 'CASE-003',
    client: 'Bob Johnson',
    type: 'Medical Malpractice',
    status: 'Settlement',
    filingDate: '2024-01-20',
    nextHearing: null,
    assignedAttorney: 'Emily Davis',
    insuranceProvider: 'Progressive',
    lastActivity: 'Settlement offer received',
    lastUpdated: '2024-04-02',
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

  getById: publicProcedure.input(z.string()).query(({ input }) => {
    return SAMPLE_CASES.find((case_) => case_.id === input);
  }),

  getStatuses: publicProcedure.query(() => {
    return ['Active', 'Discovery', 'Settlement', 'Closed'];
  }),
});
