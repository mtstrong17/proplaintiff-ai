import 'server-only'; // <-- ensure this file cannot be imported from the client
import { createTRPCContext, createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { appRouter, createContext } from '@workspace/api';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { makeQueryClient } from './query-client';
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryClient,
});
// If your router is on a separate server, pass a client:
createTRPCOptionsProxy({
  client: createTRPCClient({
    links: [httpBatchLink({ url: 'http://localhost:3000', transformer: superjson })],
  }),
  queryClient: getQueryClient,
});