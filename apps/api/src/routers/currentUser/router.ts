import { z } from 'zod';
import { publicProcedure, router } from '../../trpc.js';

export const currentUserRouter = router({
  getOrganizations: publicProcedure
    .output(
      z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          logo: z.string(),
          plan: z.string(),
        })
      )
    )
    .query(async () => {
      return [
        {
          id: '1',
          name: 'Acme Corp',
          logo: '/acme.png',
          plan: 'Enterprise',
        },
        {
          id: '2',
          name: 'Startup Inc',
          logo: '/acme.png',
          plan: 'Pro',
        },
        {
          id: '3',
          name: 'Tech Solutions',
          logo: '/acme.png',
          plan: 'Basic',
        },
      ];
    }),
});
