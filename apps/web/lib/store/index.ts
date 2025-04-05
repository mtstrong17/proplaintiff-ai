import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Case {
  id: string;
  client: string;
  type: string;
  status: string;
  filingDate: string;
  nextHearing?: string | null;
  assignedAttorney: string;
  lastActivity: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  incidentType: string;
  incidentDate: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
}

interface GlobalState {
  // Selected Items
  selectedCaseId: string | null;
  selectedLeadId: string | null;
  selectedOrganizationId: string | null;

  // Filters
  caseFilters: {
    status: string;
    search: string;
  };
  leadFilters: {
    status: string;
    search: string;
  };

  // Actions
  setSelectedCaseId: (id: string | null) => void;
  setSelectedLeadId: (id: string | null) => void;
  setSelectedOrganizationId: (id: string | null) => void;
  setCaseFilters: (filters: { status: string; search: string }) => void;
  setLeadFilters: (filters: { status: string; search: string }) => void;
}

export const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Selected Items
      selectedCaseId: null,
      selectedLeadId: null,
      selectedOrganizationId: null,

      // Filters
      caseFilters: {
        status: '',
        search: '',
      },
      leadFilters: {
        status: '',
        search: '',
      },

      // Actions
      setSelectedCaseId: (id) => set({ selectedCaseId: id }),
      setSelectedLeadId: (id) => set({ selectedLeadId: id }),
      setSelectedOrganizationId: (id) => set({ selectedOrganizationId: id }),
      setCaseFilters: (filters) => set({ caseFilters: filters }),
      setLeadFilters: (filters) => set({ leadFilters: filters }),
    }),
    {
      name: 'proplaintiff-storage',
    }
  )
);
