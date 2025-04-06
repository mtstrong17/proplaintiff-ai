import { z } from 'zod';
import { SAMPLE_CASES } from '../../services/mockData.js';
import { publicProcedure } from '../../trpc.js';
import { Case } from '../../types/case.js';

export const getCases = publicProcedure
  .input(
    z
      .object({
        status: z.string().optional(),
        search: z.string().optional(),
      })
      .optional()
  )
  .output(z.array(Case))
  .query(({ input }) => {
    let filteredCases = [...SAMPLE_CASES];

    if (input?.status && input.status.length > 0) {
      filteredCases = filteredCases.filter(
        (case_) => case_.status.toLowerCase() === input.status!.toLowerCase()
      );
    }

    if (input?.search && input.search.length > 0) {
      const searchLower = input.search.toLowerCase();
      filteredCases = filteredCases.filter(
        (case_) =>
          case_.client.toLowerCase().includes(searchLower) ||
          case_.id.toLowerCase().includes(searchLower) ||
          case_.type.toLowerCase().includes(searchLower)
      );
    }

    return filteredCases;
  });
