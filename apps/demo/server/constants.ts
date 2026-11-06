/**
 * Placeholder written in `index.html` (on `<app-root ngCspNonce>` and on the
 * inline Matomo snippet). It is swapped for a per-request nonce before the
 * rendered HTML is sent, so inline scripts can run under a strict CSP.
 */
export const CSP_NONCE_PLACEHOLDER = '__CSP_NONCE__';

/** Path prefix the app is served under; must match `baseHref` in project.json. */
export const BASE_PATH = '/webcomponents';

export const MATOMO_HOST = 'https://ipedis.matomo.cloud';
export const DESIGN_SYSTEM_HOST = 'https://design.ipedis.com';
