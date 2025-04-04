'use client';

import { LucideIcon } from 'lucide-react';
import * as React from 'react';

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

interface Item {
  id: string;
  name: string;
}

interface SidebarPopoverMenuProps<T extends Item> {
  icon: LucideIcon;
  items: T[];
  selectedItem: T | null;
  isOpen: boolean;
  searchQuery: string;
  onOpenChange: (open: boolean) => void;
  onSearch: (value: string) => void;
  onSelect: (item: T) => void;
  title: string;
  placeholder: string;
  emptyMessage: string;
  groupTitle: string;
  addNewText: string;
}

export function SidebarPopoverMenu<T extends Item>({
  icon: Icon,
  items,
  selectedItem,
  isOpen,
  searchQuery,
  onOpenChange,
  onSearch,
  onSelect,
  title,
  placeholder,
  emptyMessage,
  groupTitle,
  addNewText,
}: SidebarPopoverMenuProps<T>) {
  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const itemsToShow = searchQuery ? filteredItems : items;
  const showGroupTitle = itemsToShow.length > 0;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="rounded-lg border bg-background">
        <Popover open={isOpen} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              size="md"
              className="data-[state=open]:bg-accent/50"
            >
              <Icon className="size-4 text-muted-foreground" />
              <span className="ml-2 truncate text-sm">
                {selectedItem?.name || title}
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
                placeholder={placeholder}
                value={searchQuery}
                onValueChange={onSearch}
                className="border-none focus:ring-0"
              />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                {showGroupTitle && (
                  <CommandGroup heading={groupTitle}>
                    {itemsToShow.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => onSelect(item)}
                        className="flex items-center gap-2 p-2"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span>{item.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                <div className="border-t px-2 pb-2 pt-1">
                  <button 
                    className="flex w-full select-none items-center justify-start rounded-md p-2 text-sm leading-none text-primary no-underline outline-none transition-colors hover:bg-accent/50"
                    onClick={() => onOpenChange(false)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {addNewText}
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