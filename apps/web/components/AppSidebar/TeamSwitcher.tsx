import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import _TeamSwitcher from "./_TeamSwitcher"
import { getQueryClient, trpc } from "@/trpc/server"
export interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

export default async function TeamSwitcher() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(trpc.getTeams.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <_TeamSwitcher />
    </HydrationBoundary>
  )
}