import { z } from 'zod';
import { publicProcedure } from '../../trpc.js';

export const listOrganizations = publicProcedure
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
    // Dummy data for organizations
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
  });
