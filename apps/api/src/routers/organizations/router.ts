import { router } from '../../trpc.js';
import { listOrganizations } from './list-organizations.js';

export const organizationsRouter = router({
  list: listOrganizations,
});
