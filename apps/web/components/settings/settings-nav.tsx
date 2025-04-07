'use client';

import { Button } from '@workspace/ui/components/button';
import {
    BarChart3,
    Bell,
    Building2,
    CreditCard,
    FileText,
    Shield,
    User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const userSettings = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: User,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: Bell,
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: Shield,
  },
];

const organizationSettings = [
  {
    title: 'Organizations',
    href: '/settings/organizations',
    icon: Building2,
  },
  {
    title: 'Subscription',
    href: '/settings/subscription',
    icon: CreditCard,
  },
  {
    title: 'Usage',
    href: '/settings/usage',
    icon: BarChart3,
  },
  {
    title: 'Audit Log',
    href: '/settings/audit-log',
    icon: FileText,
  },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-6">
      <div className="grid gap-1">
        <h4 className="text-sm font-medium text-muted-foreground">User Settings</h4>
        {userSettings.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        ))}
      </div>

      <div className="grid gap-1">
        <h4 className="text-sm font-medium text-muted-foreground">Organization Settings</h4>
        {organizationSettings.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
} 