import { create } from 'zustand';

interface Case {
  id: string;
  name: string;
  // Add more case properties as needed
}

interface CaseStore {
  cases: Case[];
  currentCase: Case | null;
  searchQuery: string;
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  setCurrentCase: (caseItem: Case | null) => void;
  setCases: (cases: Case[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  filteredCases: Case[];
  casesForCurrentOrg: Case[];
}

export const useCaseStore = create<CaseStore>((set, get) => ({
  cases: [],
  currentCase: null,
  searchQuery: '',
  isSearching: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentCase: (caseItem) => set({ currentCase: caseItem }),
  setCases: (cases) => set({ cases, casesForCurrentOrg: cases }),
  setIsSearching: (isSearching) => set({ isSearching }),
  get filteredCases() {
    const state = get();
    if (!state.searchQuery) return state.casesForCurrentOrg;
    return state.casesForCurrentOrg.filter((caseItem) =>
      caseItem.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  },
  casesForCurrentOrg: [],
})); 