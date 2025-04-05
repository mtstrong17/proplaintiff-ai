'use client';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@workspace/ui/components/sidebar';
import {
  BarChart3,
  ClipboardList,
  Clock,
  FileText,
  MessageSquare,
  Receipt,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const caseNavigationConfig = [
  {
    id: 'case-overview',
    name: 'Case Overview',
    href: '/case/overview',
    icon: BarChart3,
  },
  {
    id: 'case-timeline',
    name: 'Timeline',
    href: '/case/timeline',
    icon: Clock,
  },
  {
    id: 'case-documents',
    name: 'Documents',
    href: '/case/documents',
    icon: FileText,
  },
  {
    id: 'case-tasks',
    name: 'Tasks',
    href: '/case/tasks',
    icon: ClipboardList,
  },
  {
    id: 'case-communications',
    name: 'Communications',
    href: '/case/communications',
    icon: MessageSquare,
  },
  {
    id: 'case-billing',
    name: 'Billing',
    href: '/case/billing',
    icon: Receipt,
  },
] as const;

export function CaseNavigation() {
  const pathname = usePathname();

  const renderNavigationItem = (item: { id: string; name: string; href: string; icon: any }) => {
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
  };

  return (
    <SidebarMenu>
      {caseNavigationConfig.map(renderNavigationItem)}
    </SidebarMenu>
  );
} 