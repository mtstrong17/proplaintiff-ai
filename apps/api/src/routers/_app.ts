import { router } from '../trpc.js';
import { casesRouter } from './cases.js';
import { currentUserRouter } from './currentUser/router.js';
import { dashboardRouter } from './dashboard.js';
import { leadsRouter } from './leads.js';

export const appRouter = router({
  currentUser: currentUserRouter,
  dashboard: dashboardRouter,
  cases: casesRouter,
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
