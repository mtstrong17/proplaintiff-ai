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

  getUpcomingDeadlines: publicProcedure.query(() => {
    // Generate dates that are always in the future relative to the current date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    return [
      {
        id: 1,
        title: 'File Motion Response',
        dueDate: tomorrow.toISOString().split('T')[0],
        caseId: 'CASE-001',
      },
      {
        id: 2,
        title: 'Settlement Conference',
        dueDate: dayAfterTomorrow.toISOString().split('T')[0],
        caseId: 'CASE-002',
      },
      {
        id: 3,
        title: 'Document Review',
        dueDate: threeDaysFromNow.toISOString().split('T')[0],
        caseId: 'CASE-003',
      },
    ];
  }),
});
