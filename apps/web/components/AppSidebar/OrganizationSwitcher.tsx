'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Building } from 'lucide-react';
import * as React from 'react';
import { SidebarPopoverMenu } from './SidebarPopoverMenu';

function OrganizationSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const trpc = useTRPC();
  const { data: organizations } = useQuery(trpc.currentUser.getOrganizations.queryOptions());
  const [activeOrganization, setActiveOrganization] = React.useState(organizations?.[0] || null);

  React.useEffect(() => {
    setActiveOrganization(activeOrganization || organizations?.[0] || null);
  }, [organizations]);

  const handleSelect = (org: typeof activeOrganization) => {
    if (org) {
      setActiveOrganization(org);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  if (!activeOrganization) {
    return null;
  }

  return (
    <SidebarPopoverMenu
      icon={Building}
      items={organizations || []}
      selectedItem={activeOrganization}
      isOpen={isOpen}
      searchQuery={searchQuery}
      onOpenChange={setIsOpen}
      onSearch={setSearchQuery}
      onSelect={handleSelect}
      title="Select Organization"
      placeholder="Search organizations..."
      emptyMessage="No organizations found."
      groupTitle="Organizations"
      addNewText="Add Organization"
    />
  );
}

export default OrganizationSwitcher; 