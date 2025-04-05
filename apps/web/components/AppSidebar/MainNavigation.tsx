'use client';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@workspace/ui/components/sidebar';
import {
    Calendar,
    LayoutDashboard,
    Scale,
    Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationConfig = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'cases',
    name: 'Cases',
    href: '/cases',
    icon: Scale,
  },
  {
    id: 'leads',
    name: 'Leads',
    href: '/leads',
    icon: Users,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    href: '/calendar',
    icon: Calendar,
  },
] as const;

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navigationConfig.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <SidebarMenuItem key={item.id}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                size="md"
                className={isActive ? "bg-accent/50" : undefined}
              >
                <div className="flex items-center">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="ml-2 truncate text-sm">
                    {item.name}
                  </span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
} 