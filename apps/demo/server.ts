import { APP_BASE_HREF } from '@angular/common';
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
  server.use('/assets', express.static(join(browserDistFolder, 'assets')));

  server.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.use((req, res, next) => {
    angularNodeAppEngine.handle(req, {
      server: 'express',
    }).then(response => {
      return response ? writeResponseToNodeResponse(response, res) : next();
    }).catch(err => next(err));
  });

  return server;
}

const server = app();

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] ? parseInt(process.env['PORT']) : 4001;
  const ip = process.env['IP'] || '0.0.0.0';

  server.listen(port,ip, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

console.log('Node Express server started');

// This exposes the RequestHandler
export const reqHandler = createNodeRequestHandler(server);
