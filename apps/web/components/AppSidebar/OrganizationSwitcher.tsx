'use client';

import { Building, Plus } from 'lucide-react';
import * as React from 'react';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@workspace/ui/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@workspace/ui/components/sidebar';
import { useEffect } from 'react';

function OrganizationSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const trpc = useTRPC();
  const { data: organizations } = useQuery(trpc.currentUser.getOrganizations.queryOptions());
  const { isMobile } = useSidebar();
  const [activeOrganization, setActiveOrganization] = React.useState(organizations?.[0] || null);

  useEffect(() => {
    setActiveOrganization(activeOrganization || organizations?.[0] || null);
  }, [organizations]);

  const filteredOrganizations = React.useMemo(() => {
    if (!searchQuery) return organizations || [];
    return (organizations || []).filter((org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [organizations, searchQuery]);

  if (!activeOrganization) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className="rounded-lg border bg-background">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              size="md"
              className="data-[state=open]:bg-accent/50"
            >
              <Building className="size-4 text-muted-foreground" />
              <span className="ml-2 truncate text-sm">
                {activeOrganization.name}
              </span>
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent 
            className="w-full p-0" 
            align="start" 
            side="bottom" 
            sideOffset={4}
          >
            <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder="Search organizations..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="border-none focus:ring-0"
              />
              <CommandList>
                <CommandEmpty>No organizations found.</CommandEmpty>
                <CommandGroup heading="Organizations">
                  {filteredOrganizations.map((org) => (
                    <CommandItem
                      key={org.id}
                      onSelect={() => {
                        setActiveOrganization(org);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-2 p-2"
                    >
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{org.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <div className="border-t px-2 pb-2 pt-1">
                  <button 
                    className="flex w-full select-none items-center justify-start rounded-md p-2 text-sm leading-none text-primary no-underline outline-none transition-colors hover:bg-accent/50"
                    onClick={() => setIsOpen(false)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Organization
                  </button>
                </div>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default OrganizationSwitcher; 