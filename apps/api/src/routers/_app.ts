import { router } from '../trpc.js';
import { casesRouter } from './cases.js';
import { currentUserRouter } from './currentUser/router.js';
import { dashboardRouter } from './dashboard.js';

export const appRouter = router({
  currentUser: currentUserRouter,
  dashboard: dashboardRouter,
  cases: casesRouter,
});

export type AppRouter = typeof appRouter;
