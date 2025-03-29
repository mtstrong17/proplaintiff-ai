import * as React from 'react';

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import _TeamSwitcher from './_TeamSwitcher';
export interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

export default async function TeamSwitcher() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(trpc.getTeams.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <_TeamSwitcher />
    </HydrationBoundary>
  );
}
