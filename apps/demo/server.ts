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
import { readBuiltBasePath, staticAssets } from './server/static-assets';

export function app(
  config: ServerConfig = loadServerConfig(),
): express.Express {
  const server = express();
  server.disable('x-powered-by');
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const basePath = readBuiltBasePath(browserDistFolder);

  // Order matters: the nonce must exist before the CSP header is built, and
  // the external redirects must run before the Angular engine.
  server.use(cspNonce());
  server.use(securityHeaders(config));
  server.use(compression());
  server.use(healthcheck());
  // Without a build (`ng serve`), Vite serves the files and strips the base
  // path, so neither the static files nor the redirects apply.
  if (basePath !== null) {
    server.use(staticAssets(browserDistFolder, basePath));
    if (config.homeRedirect) {
      server.use(designSystemRedirects(basePath, config.designSystemUrl));
    }
  }
  server.use(angularHandler(createAngularEngine(), toPublicAppConfig(config)));

  return server;
}

/**
 * An invalid variable stops the server. Thrown from the bundle, the error
 * would be printed after a line of minified code, so print the message alone.
 * Under the dev server (not the main module), let it throw as usual.
 */
function startupConfig(): ServerConfig {
  try {
    return loadServerConfig();
  } catch (error) {
    if (!isMainModule(import.meta.url)) {
      throw error;
    }
    console.error(`Invalid configuration: ${(error as Error).message}`);
    process.exit(1);
  }
}

loadLocalEnvFile();
const server = app(startupConfig());

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
