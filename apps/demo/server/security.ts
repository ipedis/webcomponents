import type { RequestHandler, Response } from 'express';
import helmet from 'helmet';
import { randomBytes } from 'node:crypto';
import type { ServerConfig } from './config';

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
export function securityHeaders(config: ServerConfig): RequestHandler[] {
  return [
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: cspDirectives(config),
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

export function cspDirectives(config: ServerConfig) {
  // When Matomo is disabled its host is left out, so the browser blocks any
  // tracking call instead of sending it.
  const matomo = config.matomo.enabled ? [config.matomo.url] : [];
  return {
    'default-src': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
    'form-action': ["'self'"],
    // The demos are reverse-proxied under the design system site; allow it
    // to frame them as well, should it ever embed them directly.
    'frame-ancestors': ["'self'", config.designSystemUrl],
    'frame-src': ["'self'"],
    'script-src': [
      "'self'",
      (_req: unknown, res: unknown) =>
        `'nonce-${getCspNonce(res as Response)}'`,
      ...matomo,
    ],
    // Angular SSR and the Stencil components inject <style> elements (and
    // inline style attributes); a nonce cannot cover all of them.
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', ...matomo],
    'font-src': ["'self'"],
    'connect-src': ["'self'", ...matomo],
    'worker-src': ["'self'", 'blob:'],
    'manifest-src': ["'self'"],
  };
}
