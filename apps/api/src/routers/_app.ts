import { router } from '../trpc.js';
import { organizationsRouter } from './organizations/router.js';

export const appRouter = router({
  organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;
