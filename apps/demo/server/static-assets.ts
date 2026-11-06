import express, { Router } from 'express';
import { join } from 'node:path';
import { BASE_PATH } from './constants';

/** Serves the browser build under the base path (hashed files, cached 1 year). */
export function staticAssets(browserDistFolder: string): Router {
  const router = Router();
  router.use(
    `${BASE_PATH}/assets`,
    express.static(join(browserDistFolder, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }),
  );
  router.use(
    BASE_PATH,
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    }),
  );
  return router;
}
