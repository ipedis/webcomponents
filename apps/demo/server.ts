import { createNodeRequestHandler, isMainModule } from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { angularHandler, createAngularEngine } from './server/angular-handler';
import {
  loadLocalEnvFile,
  loadServerConfig,
  toPublicAppConfig,
  type ServerConfig,
} from './server/config';
import { designSystemRedirects, healthcheck } from './server/routes';
import { cspNonce, securityHeaders } from './server/security';
import { checkBaseHref, staticAssets } from './server/static-assets';

export function app(
  config: ServerConfig = loadServerConfig(),
): express.Express {
  const server = express();
  server.disable('x-powered-by');
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  checkBaseHref(browserDistFolder, config.basePath);

  // Order matters: the nonce must exist before the CSP header is built, and
  // the external redirects must run before the Angular engine.
  server.use(cspNonce());
  server.use(securityHeaders(config));
  server.use(compression());
  server.use(staticAssets(browserDistFolder, config.basePath));
  server.use(healthcheck());
  server.use(designSystemRedirects(config));
  server.use(angularHandler(createAngularEngine(), toPublicAppConfig(config)));

  return server;
}

loadLocalEnvFile();
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
