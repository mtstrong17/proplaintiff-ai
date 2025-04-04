'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';
import * as React from 'react';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@workspace/ui/components/sidebar';
import Image from 'next/image';
import { useEffect } from 'react';

function OrganizationSwitcher() {
  const trpc = useTRPC();
  const { data: organizations } = useQuery(trpc.organizations.list.queryOptions());
  const { isMobile } = useSidebar();
  const [activeOrganization, setActiveOrganization] = React.useState(organizations?.[0] || null);

  useEffect(() => {
    setActiveOrganization(activeOrganization || organizations?.[0] || null);
  }, [organizations]);

  if (!activeOrganization) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Image src={activeOrganization.logo} alt={activeOrganization.name} width={32} height={32} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeOrganization.name}</span>
                <span className="truncate text-xs">{activeOrganization.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onChange={(e) => {
              console.log('e', e);
            }}
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">Organizations</DropdownMenuLabel>
            {organizations!.map((org, index) => (
              <DropdownMenuItem
                key={org.name}
                onClick={() => setActiveOrganization(org)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    className="size-4 shrink-0"
                    width={32}
                    height={32}
                  />
                </div>
                {org.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add organization</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default OrganizationSwitcher; 