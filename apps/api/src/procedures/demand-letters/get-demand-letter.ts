import { z } from 'zod';
import { SAMPLE_DEMAND_LETTERS } from '../../services/mockData.js';
import { publicProcedure } from '../../trpc.js';
import { DemandLetter } from '../../types/case.js';

export const getDemandLetter = publicProcedure
  .input(z.string())
  .output(DemandLetter.nullable())
  .query(({ input: caseId }) => {
    const demandLetter = SAMPLE_DEMAND_LETTERS[caseId];
    return demandLetter ?? null;
  });
