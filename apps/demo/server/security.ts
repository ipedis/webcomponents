import type { RequestHandler, Response } from 'express';
import helmet from 'helmet';
import { randomBytes } from 'node:crypto';
import { DESIGN_SYSTEM_HOST, MATOMO_HOST } from './constants';

const PERMISSIONS_POLICY =
  'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()';

/** Generates one nonce per request, shared between the CSP header and the HTML. */
export function cspNonce(): RequestHandler {
  return (_req, res, next) => {
    res.locals['cspNonce'] = randomBytes(16).toString('base64');
    next();
  };
}

export function getCspNonce(res: Response): string {
  return res.locals['cspNonce'] as string;
}

/** Helmet headers (CSP included) plus a Permissions-Policy header. */
export function securityHeaders(): RequestHandler[] {
  return [
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: cspDirectives(),
      },
      // Behind Cloudflare + nginx; let the edge decide for sub-domains.
      strictTransportSecurity: { maxAge: 31536000, includeSubDomains: false },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      // Not set by helmet: keep it explicit below.
      crossOriginEmbedderPolicy: false,
    }),
    (_req, res, next) => {
      res.setHeader('Permissions-Policy', PERMISSIONS_POLICY);
      next();
    },
  ];
}

function cspDirectives() {
  return {
    'default-src': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
    'form-action': ["'self'"],
    // The demos are reverse-proxied under design.ipedis.com; allow it to
    // frame them as well, should it ever embed them directly.
    'frame-ancestors': ["'self'", DESIGN_SYSTEM_HOST],
    'frame-src': ["'self'"],
    'script-src': [
      "'self'",
      (_req: unknown, res: unknown) =>
        `'nonce-${getCspNonce(res as Response)}'`,
      MATOMO_HOST,
    ],
    // Angular SSR and the Stencil components inject <style> elements (and
    // inline style attributes); a nonce cannot cover all of them.
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', MATOMO_HOST],
    'font-src': ["'self'"],
    'connect-src': ["'self'", MATOMO_HOST],
    'worker-src': ["'self'", 'blob:'],
    'manifest-src': ["'self'"],
  };
}
