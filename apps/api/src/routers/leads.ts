import { z } from 'zod';
import { publicProcedure, router } from '../trpc.js';

const LeadStatus = z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST']);

const Lead = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: LeadStatus,
  source: z.string(),
  notes: z.string().nullable(),
  createdAt: z.string(),
  lastActivity: z.string(),
});

const SAMPLE_LEADS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    status: 'NEW',
    source: 'Website Form',
    notes: 'Potential car accident case',
    createdAt: '2024-03-15T10:00:00Z',
    lastActivity: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    status: 'CONTACTED',
    source: 'Referral',
    notes: 'Follow up scheduled for next week',
    createdAt: '2024-03-14T15:30:00Z',
    lastActivity: '2024-03-15T09:15:00Z',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    status: 'QUALIFIED',
    source: 'Google Ads',
    notes: 'Slip and fall case, high priority',
    createdAt: '2024-03-13T08:45:00Z',
    lastActivity: '2024-03-15T11:30:00Z',
  },
] as const;

export const leadsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        status: LeadStatus.optional(),
        search: z.string().optional(),
      })
    )
    .query(({ input }) => {
      let filteredLeads = [...SAMPLE_LEADS];

      if (input.status) {
        filteredLeads = filteredLeads.filter((lead) => lead.status === input.status);
      }

      if (input.search) {
        const searchLower = input.search.toLowerCase();
        filteredLeads = filteredLeads.filter(
          (lead) =>
            lead.name.toLowerCase().includes(searchLower) ||
            lead.email.toLowerCase().includes(searchLower) ||
            lead.phone.toLowerCase().includes(searchLower)
        );
      }

      return filteredLeads;
    }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    const lead = SAMPLE_LEADS.find((l) => l.id === input.id);
    return lead || null;
  }),

  getStatuses: publicProcedure.query(() => {
    return ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'] as const;
  }),

  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
    const leadIndex = SAMPLE_LEADS.findIndex((l) => l.id === input.id);
    if (leadIndex === -1) {
      throw new Error('Lead not found');
    }
    // In a real implementation, this would delete from the database
    return { success: true };
  }),
});
