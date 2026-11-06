import express, { Router } from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

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
    basePath,
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    }),
  );
  return router;
}

/**
 * `baseHref` is fixed at build time while BASE_PATH is read at startup. When
 * they differ, every asset 404s, so say it loudly in the logs. The check is
 * skipped when there is no built index (dev server).
 */
export function checkBaseHref(
  browserDistFolder: string,
  basePath: string,
): void {
  const indexPath = join(browserDistFolder, 'index.csr.html');
  if (!existsSync(indexPath)) {
    return;
  }
  const expected = `<base href="${basePath}/"`;
  if (!readFileSync(indexPath, 'utf8').includes(expected)) {
    console.error(
      `BASE_PATH is "${basePath}" but the build was made with another baseHref ` +
        `(${expected}> not found in index.csr.html). Assets will not load.`,
    );
  }
}
