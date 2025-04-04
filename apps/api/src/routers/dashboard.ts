import dayjs from 'dayjs';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc.js';
// Sample data - In a real app, this would come from your database
const SAMPLE_CASES = [
  { id: 1, client: 'John Doe', type: 'Auto Accident', status: 'Active', lastUpdated: '2024-04-04' },
  {
    id: 2,
    client: 'Jane Smith',
    type: 'Slip and Fall',
    status: 'Discovery',
    lastUpdated: '2024-04-03',
  },
  {
    id: 3,
    client: 'Bob Johnson',
    type: 'Medical Malpractice',
    status: 'Settlement',
    lastUpdated: '2024-04-02',
  },
];

const SAMPLE_METRICS = {
  activeCases: 45,
  pendingSettlements: 12,
  documentsToReview: 28,
  upcomingDeadlines: 8,
};

export const dashboardRouter = router({
  getMetrics: publicProcedure.query(() => {
    return SAMPLE_METRICS;
  }),

  getRecentCases: publicProcedure.query(() => {
    return SAMPLE_CASES;
  }),

  getCasesByStatus: publicProcedure.query(() => {
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
