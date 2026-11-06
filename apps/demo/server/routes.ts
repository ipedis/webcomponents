import { Router } from 'express';

/** Liveness probe used by the Kubernetes deployment. */
export function healthcheck(): Router {
  const router = Router();
  router.get('/_infra/healthcheck', (_req, res) => {
    res.status(200).send('ok');
  });
  return router;
}

/**
 * The Angular router cannot redirect to an external URL, so the "home" routes
 * that bounce visitors back to the design system site are handled here,
 * before the SSR engine.
 */
export function designSystemRedirects(
  basePath: string,
  designSystemUrl: string,
): Router {
  const router = Router();
  router.get(
    [basePath || '/', `${basePath}/fr`, `${basePath}/en`],
    (_req, res) => {
      res.redirect(302, designSystemUrl);
    },
  );
  return router;
}
