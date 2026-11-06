import express, { Router } from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Path prefix of the build, read from the `<base href>` of the built index
 * (`baseHref` in project.json), without the trailing slash: "/webcomponents".
 * Reading it here instead of from a variable means the server can never
 * serve the files under another path than the one the HTML points to.
 *
 * Returns null when there is no build: under `ng serve`, Vite serves the
 * files and strips the base path itself.
 */
export function readBuiltBasePath(browserDistFolder: string): string | null {
  const indexPath = join(browserDistFolder, 'index.csr.html');
  if (!existsSync(indexPath)) {
    return null;
  }
  const baseHref = /<base href="([^"]*)"/.exec(
    readFileSync(indexPath, 'utf8'),
  )?.[1];
  if (baseHref === undefined || !baseHref.startsWith('/')) {
    throw new Error(`${indexPath} has no absolute <base href>.`);
  }
  return baseHref.replace(/\/+$/, '');
}

/** Serves the browser build under the base path (hashed files, cached 1 year). */
export function staticAssets(
  browserDistFolder: string,
  basePath: string,
): Router {
  const router = Router();
  router.use(
    `${basePath}/assets`,
    express.static(join(browserDistFolder, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }),
  );
  router.use(
    basePath || '/',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    }),
  );
  return router;
}
