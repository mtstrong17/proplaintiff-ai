'use client';

import { useCaseStore } from '@/lib/store/case-store';
import { Briefcase } from 'lucide-react';
import { SidebarPopoverMenu } from './SidebarPopoverMenu';

export function CaseSearch() {
  const {
    currentCase,
    setCurrentCase,
    casesForCurrentOrg,
    searchQuery,
    setSearchQuery,
    isSearching,
    setIsSearching
  } = useCaseStore();

  const handleSelect = (caseItem: typeof currentCase) => {
    if (caseItem) {
      setCurrentCase(caseItem);
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  return (
    <SidebarPopoverMenu
      icon={Briefcase}
      items={casesForCurrentOrg}
      selectedItem={currentCase}
      isOpen={isSearching}
      searchQuery={searchQuery}
      onOpenChange={setIsSearching}
      onSearch={setSearchQuery}
      onSelect={handleSelect}
      title="Select a case"
      placeholder="Search cases..."
      emptyMessage="No cases found."
      groupTitle="Cases"
      addNewText="Add New Case"
    />
  );
} 