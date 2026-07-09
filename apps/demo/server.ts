import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  // The app is served behind a reverse proxy (design.ipedis.com), which sets
  // X-Forwarded-* headers; without this they are stripped with a warning.
  const angularNodeAppEngine = new AngularNodeAppEngine({
    trustProxyHeaders: [
      'x-forwarded-for',
      'x-forwarded-host',
      'x-forwarded-proto',
      'x-forwarded-port',
      'x-forwarded-prefix',
    ],
  });

  server.use(compression());

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  // Serve static assets under /webcomponents/ prefix (matching baseHref)
  server.use(
    '/webcomponents/assets',
    express.static(join(browserDistFolder, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }),
  );
  server.use(
    '/webcomponents',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    }),
  );

  server.get('/_infra/healthcheck', (req, res) => {
    res.status(200).send('ok');
  });

  // The Angular router cannot redirect to an external URL, so the "home"
  // routes that bounce visitors back to the design system site are handled
  // here, before the SSR engine.
  server.get(
    ['/webcomponents', '/webcomponents/fr', '/webcomponents/en'],
    (req, res) => {
      res.redirect(302, 'https://design.ipedis.com');
    },
  );

  // All regular routes use the Angular engine
  server.use((req, res, next) => {
    angularNodeAppEngine
      .handle(req, {
        server: 'express',
      })
      .then((response: Response | null) => {
        if (!response) {
          return next();
        }
        // The engine emits body-less chunked 3xx responses, which the
        // reverse proxy in front of this app turns into bare 500s. Convert
        // them to regular Express redirects (Content-Length + body).
        const location = response.headers.get('location');
        if (response.status >= 300 && response.status < 400 && location) {
          res.redirect(response.status, location);
          return;
        }
        return writeResponseToNodeResponse(response, res);
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
