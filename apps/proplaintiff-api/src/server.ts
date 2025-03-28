import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc.js';
import { createContext } from './trpc.js';

const server = createHTTPServer({
router: appRouter,
createContext: createContext,
});

server.listen(8080);