import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter, createContext } from './trpc.js';

const server = createHTTPServer({
  router: appRouter,
  createContext: createContext,
  middleware: cors(),
});

server.listen(8080);
