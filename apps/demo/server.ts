import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

/**
 * Placeholder written in `index.html` (on `<app-root ngCspNonce>` and on the
 * inline Matomo snippet). It is swapped for a per-request nonce before the
 * rendered HTML is sent, so inline scripts can run under a strict CSP.
 */
const CSP_NONCE_PLACEHOLDER = '__CSP_NONCE__';
const MATOMO_HOST = 'https://ipedis.matomo.cloud';
const DESIGN_SYSTEM_HOST = 'https://design.ipedis.com';

export function app(): express.Express {
  const server = express();
  server.disable('x-powered-by');
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

  // One nonce per request, shared between the CSP header and the HTML.
  server.use((req, res, next) => {
    res.locals['cspNonce'] = randomBytes(16).toString('base64');
    next();
  });

  server.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          'default-src': ["'self'"],
          'base-uri': ["'self'"],
          'object-src': ["'none'"],
          'form-action': ["'self'"],
          // The demos are reverse-proxied under design.ipedis.com; allow it
          // to frame them as well, should it ever embed them directly.
          'frame-ancestors': ["'self'", DESIGN_SYSTEM_HOST],
          'frame-src': ["'self'"],
          'script-src': [
            "'self'",
            (req, res) =>
              `'nonce-${(res as express.Response).locals['cspNonce']}'`,
            MATOMO_HOST,
          ],
          // Angular SSR and the Stencil components inject <style> elements
          // (and inline style attributes); a nonce cannot cover all of them.
          'style-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:', MATOMO_HOST],
          'font-src': ["'self'"],
          'connect-src': ["'self'", MATOMO_HOST],
          'worker-src': ["'self'", 'blob:'],
          'manifest-src': ["'self'"],
        },
      },
      // Behind Cloudflare + nginx; let the edge decide for sub-domains.
      strictTransportSecurity: { maxAge: 31536000, includeSubDomains: false },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      // Not set by helmet: keep it explicit below.
      crossOriginEmbedderPolicy: false,
    }),
  );
  server.use((req, res, next) => {
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    );
    next();
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
        // Inject the per-request CSP nonce into the rendered HTML.
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('text/html')) {
          return response.text().then((html) => {
            response.headers.forEach((value, key) => {
              if (key !== 'content-length' && key !== 'transfer-encoding') {
                res.setHeader(key, value);
              }
            });
            res
              .status(response.status)
              .send(
                html
                  .split(CSP_NONCE_PLACEHOLDER)
                  .join(res.locals['cspNonce'] as string),
              );
          });
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
