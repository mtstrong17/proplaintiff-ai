import cors from '@fastify/cors';
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { appRouter, type AppRouter } from './routers/_app.js';
import { createContext } from './trpc.js';

const server = fastify({
  maxParamLength: 5000,
  logger: true,
});
server.setErrorHandler((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});
await server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

server.get('/panel', async (_, res) => {
  // if (process.env.NODE_ENV !== "development") {
  //   return res.status(404).send("Not Found");
  // }

  // Dynamically import renderTrpcPanel only in development
  const { renderTrpcPanel } = await import('trpc-ui');

  res.header('Content-Type', 'text/html');
  return res.send(
    renderTrpcPanel(appRouter, {
      url: 'http://localhost:8080/trpc', // Base url of your trpc server
      meta: {
        title: 'My Backend Title',
        description:
          'This is a description of my API, which supports [markdown](https://en.wikipedia.org/wiki/Markdown).',
      },
    })
  );
});

try {
  await server.listen({ port: 8080 });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
