import { z } from 'zod';
import { SAMPLE_DEMAND_LETTERS } from '../../services/mockData.js';
import { publicProcedure } from '../../trpc.js';
import { DemandLetterVersion, DemandLetterVersionType } from '../../types/case.js';

export const createDemandLetterVersion = publicProcedure
  .input(
    z.object({
      caseId: z.string(),
      content: z.string(),
      createdBy: z.string(),
    })
  )
  .output(DemandLetterVersion)
  .mutation(({ input }) => {
    const demandLetter = SAMPLE_DEMAND_LETTERS[input.caseId];
    const newVersion: DemandLetterVersionType = {
      id: `DLV-${Math.random().toString(36).substr(2, 9)}`,
      version: demandLetter ? demandLetter.currentVersion + 1 : 1,
      content: input.content,
      createdAt: new Date().toISOString(),
      createdBy: input.createdBy,
      status: 'draft',
    };

    if (!demandLetter) {
      SAMPLE_DEMAND_LETTERS[input.caseId] = {
        id: `DL-${Math.random().toString(36).substr(2, 9)}`,
        caseId: input.caseId,
        currentVersion: 1,
        versions: [newVersion],
      };
    } else {
      demandLetter.versions.push(newVersion);
      demandLetter.currentVersion = newVersion.version;
    }

    return newVersion;
  });
