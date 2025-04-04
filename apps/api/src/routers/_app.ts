import { router } from '../trpc.js';
import { currentUserRouter } from './currentUser/router.js';

export const appRouter = router({
  currentUser: currentUserRouter,
});

export type AppRouter = typeof appRouter;
