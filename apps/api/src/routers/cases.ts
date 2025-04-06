import { deleteCase } from '../procedures/cases/delete-case.js';
import { getCaseById } from '../procedures/cases/get-case-by-id.js';
import { getCases } from '../procedures/cases/get-cases.js';
import { createDemandLetterVersion } from '../procedures/demand-letters/create-version.js';
import { getDemandLetter } from '../procedures/demand-letters/get-demand-letter.js';
import { updateDemandLetterStatus } from '../procedures/demand-letters/update-status.js';
import { publicProcedure, router } from '../trpc.js';
import { CASE_STATUSES } from '../types/case.js';

export const casesRouter = router({
  getAll: getCases,
  getById: getCaseById,
  getStatuses: publicProcedure.query(() => CASE_STATUSES),
  delete: deleteCase,
  getDemandLetter,
  createDemandLetterVersion,
  updateDemandLetterStatus,
});
