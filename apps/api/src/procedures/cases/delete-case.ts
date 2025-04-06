import { z } from 'zod';
import { SAMPLE_CASES } from '../../services/mockData.js';
import { publicProcedure } from '../../trpc.js';

export const deleteCase = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const index = SAMPLE_CASES.findIndex((case_) => case_.id === input.id);
    if (index !== -1) {
      SAMPLE_CASES.splice(index, 1);
      return { success: true };
    }
    throw new Error('Case not found');
  });
