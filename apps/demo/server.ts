import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  const angularNodeAppEngine = new AngularNodeAppEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  // Serve static assets under /webcomponents/ prefix (matching baseHref)
  server.use('/webcomponents/assets', express.static(join(browserDistFolder, 'assets')));
  server.use(
    '/webcomponents',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    }),
  );

  // All regular routes use the Angular engine
  server.use((req, res, next) => {
    angularNodeAppEngine
      .handle(req, {
        server: 'express',
      })
      .then((response: Response | null) => {
        return response ? writeResponseToNodeResponse(response, res) : next();
      })
      .catch((err: unknown) => next(err));
  });

  return server;
}

const server = app();

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] ? parseInt(process.env['PORT']) : 4000;
  const ip = process.env['IP'] || '0.0.0.0';

  server.listen(port, ip, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

console.log('Node Express server started');

// This exposes the RequestHandler
export const reqHandler = createNodeRequestHandler(server);
