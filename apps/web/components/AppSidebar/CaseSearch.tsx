'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Briefcase } from 'lucide-react';
import * as React from 'react';
import { SidebarPopoverMenu } from './SidebarPopoverMenu';

export function CaseSearch() {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const trpc = useTRPC();
  
  const { data: cases = [] } = useQuery(trpc.currentUser.getCases.queryOptions());
  
  const [currentCase, setCurrentCase] = React.useState<{ id: string; name: string; } | null>(cases?.[0] || null);
  React.useEffect(() => {
    const firstCase = cases[0];
    if (firstCase && !currentCase) {
      setCurrentCase(firstCase);
    }
  }, [cases, currentCase]);
  
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
      items={cases}
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