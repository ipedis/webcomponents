import {
  AngularNodeAppEngine,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import type { RequestHandler, Response as ExpressResponse } from 'express';
import { CSP_NONCE_PLACEHOLDER } from './constants';
import { getCspNonce } from './security';

/** Headers recomputed by Express when the HTML body is rewritten. */
const SKIPPED_HTML_HEADERS = new Set(['content-length', 'transfer-encoding']);

/**
 * The app is served behind a reverse proxy (design.ipedis.com), which sets
 * X-Forwarded-* headers; without this they are stripped with a warning.
 */
export function createAngularEngine(): AngularNodeAppEngine {
  return new AngularNodeAppEngine({
    trustProxyHeaders: [
      'x-forwarded-for',
      'x-forwarded-host',
      'x-forwarded-proto',
      'x-forwarded-port',
      'x-forwarded-prefix',
    ],
  });
}

/**
 * Renders every remaining route with Angular SSR. Express 5 forwards a
 * rejected promise to the error handler, so no try/catch is needed here.
 */
export function angularHandler(engine: AngularNodeAppEngine): RequestHandler {
  return async (req, res, next) => {
    const response = await engine.handle(req, { server: 'express' });
    if (!response) {
      next();
      return;
    }

    const location = redirectLocation(response);
    if (location) {
      // The engine emits body-less chunked 3xx responses, which the reverse
      // proxy in front of this app turns into bare 500s. Send a regular
      // Express redirect (Content-Length + body) instead.
      res.redirect(response.status, location);
      return;
    }

    if (isHtml(response)) {
      await sendHtmlWithNonce(response, res);
      return;
    }

    await writeResponseToNodeResponse(response, res);
  };
}

function redirectLocation(response: Response): string | null {
  const isRedirect = response.status >= 300 && response.status < 400;
  return isRedirect ? response.headers.get('location') : null;
}

function isHtml(response: Response): boolean {
  return (response.headers.get('content-type') ?? '').includes('text/html');
}

/** Copies the engine response, swapping the nonce placeholder in the HTML. */
async function sendHtmlWithNonce(
  response: Response,
  res: ExpressResponse,
): Promise<void> {
  const html = await response.text();
  response.headers.forEach((value, key) => {
    if (!SKIPPED_HTML_HEADERS.has(key)) {
      res.setHeader(key, value);
    }
  });
  res
    .status(response.status)
    .send(html.split(CSP_NONCE_PLACEHOLDER).join(getCspNonce(res)));
}
