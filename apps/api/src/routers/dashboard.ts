import dayjs from 'dayjs';
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

const SAMPLE_METRICS = {
  activeCases: 45,
  pendingSettlements: 12,
  documentsToReview: 28,
  upcomingDeadlines: 8,
};

export const dashboardRouter = router({
  getMetrics: publicProcedure
    .output(
      z.object({
        activeCases: z.number(),
        pendingSettlements: z.number(),
        documentsToReview: z.number(),
        upcomingDeadlines: z.number(),
      })
    )
    .query(() => {
      return SAMPLE_METRICS;
    }),

  getRecentCases: publicProcedure.output(z.array(Case)).query(() => {
    return SAMPLE_CASES;
  }),

  getCasesByStatus: publicProcedure.output(z.record(z.string(), z.number())).query(() => {
    return {
      active: 45,
      discovery: 15,
      settlement: 12,
      closed: 23,
    };
  }),

  getUpcomingDeadlines: publicProcedure
    .output(
      z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          start: z.date(),
          end: z.date(),
          caseId: z.string(),
        })
      )
    )
    .query(() => {
      const today = dayjs().startOf('day');
      const tomorrow = today.add(1, 'day');
      const dayAfterTomorrow = today.add(2, 'day');
      const threeDaysFromNow = today.add(3, 'day');

      return [
        {
          id: 1,
          title: 'File Motion Response',
          start: tomorrow.toDate(),
          end: tomorrow.add(3, 'hours').toDate(),
          caseId: 'CASE-001',
        },
        {
          id: 2,
          title: 'Settlement Conference',
          start: dayAfterTomorrow.toDate(),
          end: dayAfterTomorrow.add(3, 'hours').toDate(),
          caseId: 'CASE-002',
        },
        {
          id: 3,
          title: 'Document Review',
          start: threeDaysFromNow.toDate(),
          end: threeDaysFromNow.add(3, 'hours').toDate(),
          caseId: 'CASE-003',
        },
      ];
    }),
});
