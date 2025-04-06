import { z } from 'zod';
import { SAMPLE_DEMAND_LETTERS } from '../../services/mockData.js';
import { publicProcedure } from '../../trpc.js';
import { DemandLetterVersion, DemandLetterVersionType } from '../../types/case.js';

export const updateDemandLetterStatus = publicProcedure
  .input(
    z.object({
      caseId: z.string(),
      versionId: z.string(),
      status: z.enum(['draft', 'sent', 'approved']),
    })
  )
  .output(DemandLetterVersion)
  .mutation(({ input }) => {
    const demandLetter = SAMPLE_DEMAND_LETTERS[input.caseId];
    if (!demandLetter) {
      throw new Error('Demand letter not found');
    }

    const version = demandLetter.versions.find(
      (v: DemandLetterVersionType) => v.id === input.versionId
    );
    if (!version) {
      throw new Error('Version not found');
    }

    version.status = input.status;
    return version;
  });
