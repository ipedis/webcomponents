import { Router } from 'express';
import { BASE_PATH, DESIGN_SYSTEM_HOST } from './constants';

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
export function designSystemRedirects(): Router {
  const router = Router();
  router.get([BASE_PATH, `${BASE_PATH}/fr`, `${BASE_PATH}/en`], (_req, res) => {
    res.redirect(302, DESIGN_SYSTEM_HOST);
  });
  return router;
}
