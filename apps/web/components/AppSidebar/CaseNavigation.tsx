'use client';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@workspace/ui/components/sidebar';
import {
  BarChart3,
  Brain,
  ClipboardList,
  Clock,
  FileText,
  Lightbulb,
  LucideIcon,
  Scale,
  Sparkles,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationItem = {
  id: string;
  name: string;
  href: string;
  icon: LucideIcon;
  subItems?: {
    id: string;
    name: string;
    href: string;
    icon: LucideIcon;
  }[];
};

const caseNavigationConfig: NavigationItem[] = [
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
    id: 'case-analysis',
    name: 'Analysis',
    href: '/case/analysis',
    icon: Brain,
    subItems: [
      {
        id: 'case-analysis-overview',
        name: 'Overview',
        href: '/case/analysis',
        icon: Sparkles,
      },
      {
        id: 'case-analysis-strength',
        name: 'Case Strength',
        href: '/case/analysis/strength',
        icon: Scale,
      },
      {
        id: 'case-analysis-insights',
        name: 'Key Insights',
        href: '/case/analysis/insights',
        icon: Lightbulb,
      },
      {
        id: 'case-analysis-strategy',
        name: 'Strategy Recommendations',
        href: '/case/analysis/strategy',
        icon: Target,
      },
    ],
  },
];

export function CaseNavigation() {
  const pathname = usePathname();

  const renderNavigationItem = (item: NavigationItem) => {
    const Icon = item.icon;
    const isActive = pathname === item.href || (item.subItems && item.subItems.some(subItem => pathname === subItem.href));

    return (
      <SidebarMenuItem key={item.id}>
        {item.subItems ? (
          <>
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
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.id}>
                  <Link href={subItem.href} passHref legacyBehavior>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === subItem.href}
                    >
                      <div className="flex items-center">
                        <subItem.icon className="size-4 text-muted-foreground" />
                        <span className="ml-2 truncate text-sm">
                          {subItem.name}
                        </span>
                      </div>
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </>
        ) : (
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
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarMenu>
      {caseNavigationConfig.map(renderNavigationItem)}
    </SidebarMenu>
  );
} 