import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';

export const createContext = async () => {
  return {
    organizationId: '1',
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  processDocument: publicProcedure
    .input(
      z.object({
        documentIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {}),
});

export type AppRouter = typeof appRouter;
