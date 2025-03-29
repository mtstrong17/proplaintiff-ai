import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc.js';
import { createContext } from './trpc.js';
import cors from 'cors';

const server = createHTTPServer({
router: appRouter,
createContext: createContext,
middleware: cors(),
});

server.listen(8080);