import { SidebarNav } from '@/components/settings/sidebar-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | ProPlaintiff AI',
  description: 'Manage your account settings and preferences',
};

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings',
  },
  {
    title: 'Organizations',
    href: '/settings/organizations',
  },
  {
    title: 'Integrations',
    href: '/settings/integrations',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
  },
  {
    title: 'Security',
    href: '/settings/security',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto flex flex-col gap-8 py-8 px-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
