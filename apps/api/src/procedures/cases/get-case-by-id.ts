import { z } from 'zod';
import { SAMPLE_CASES } from '../../services/mockData.js';
import { publicProcedure } from '../../trpc.js';
import { Case } from '../../types/case.js';

export const getCaseById = publicProcedure
  .input(z.string())
  .output(Case.nullable())
  .query(({ input }) => {
    return SAMPLE_CASES.find((case_) => case_.id === input) || null;
  });
