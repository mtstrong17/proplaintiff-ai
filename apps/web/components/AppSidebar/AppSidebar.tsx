import { Sidebar, SidebarHeader } from '@workspace/ui/components/sidebar';
import TeamSwitcher from './TeamSwitcher';
export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
    </Sidebar>
  );
}
