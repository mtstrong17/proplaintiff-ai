'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader
} from '@workspace/ui/components/sidebar';
import { CaseSearch } from './CaseSearch';
import OrganizationSwitcher from './OrganizationSwitcher';

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
      </SidebarContent>
    </Sidebar>
  );
}
