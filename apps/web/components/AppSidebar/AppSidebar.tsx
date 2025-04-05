'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from '@workspace/ui/components/sidebar';
import { CaseNavigation } from './CaseNavigation';
import { CaseSearch } from './CaseSearch';
import { MainNavigation } from './MainNavigation';
import OrganizationSwitcher from './OrganizationSwitcher';
import { UserDropdown } from './UserDropdown';

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <OrganizationSwitcher />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Case</SidebarGroupLabel>
          <CaseSearch />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <MainNavigation />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Case Navigation</SidebarGroupLabel>
          <CaseNavigation />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
