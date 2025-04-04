'use client';

import { useCaseStore } from '@/lib/store/case-store';
import { Briefcase, Plus } from 'lucide-react';

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
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@workspace/ui/components/sidebar';

export function CaseSearch() {
  const {
    currentCase,
    setCurrentCase,
    casesForCurrentOrg,
    searchQuery,
    setSearchQuery,
    filteredCases,
    isSearching,
    setIsSearching
  } = useCaseStore();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectCase = (caseItem: typeof currentCase) => {
    if (caseItem) {
      setCurrentCase(caseItem);
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="rounded-lg border bg-background">
        <Popover open={isSearching} onOpenChange={setIsSearching}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              size="md"
              className="data-[state=open]:bg-accent/50"
            >
              <Briefcase className="size-4 text-muted-foreground" />
              <span className="ml-2 truncate text-sm">
                {currentCase?.name || "Select a case"}
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
                placeholder="Search cases..." 
                value={searchQuery}
                onValueChange={handleSearch}
                className="border-none focus:ring-0"
              />
              <CommandList>
                <CommandEmpty>No cases found.</CommandEmpty>
                <CommandGroup heading="Cases">
                  {(searchQuery ? filteredCases : casesForCurrentOrg).map((caseItem) => (
                    <CommandItem
                      key={caseItem.id}
                      onSelect={() => handleSelectCase(caseItem)}
                      className="flex items-center gap-2 p-2"
                    >
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{caseItem.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <div className="border-t px-2 pb-2 pt-1">
                  <button 
                    className="flex w-full select-none items-center justify-start rounded-md p-2 text-sm leading-none text-primary no-underline outline-none transition-colors hover:bg-accent/50"
                    onClick={() => setIsSearching(false)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Case
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