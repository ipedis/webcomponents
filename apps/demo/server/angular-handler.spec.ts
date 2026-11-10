/**
 * @jest-environment node
 */
import type { AngularNodeAppEngine } from '@angular/ssr/node';
import express from 'express';
import { DEFAULT_APP_CONFIG } from '../src/app/core/config/app-config';
import { angularHandler } from './angular-handler';
import { cspNonce } from './security';
import { request } from './test-server';

// The real module pulls in ESM-only dependencies Jest cannot load. These
// tests only cover HTML and redirects, which never reach it.
jest.mock('@angular/ssr/node', () => ({
  AngularNodeAppEngine: class {},
  writeResponseToNodeResponse: jest.fn(),
}));

/** Stands in for the Angular engine, answering every request with `response`. */
function appRendering(response: () => Response): express.Express {
  const engine = {
    handle: async () => response(),
  } as unknown as AngularNodeAppEngine;
  const server = express();
  server.use(cspNonce());
  server.use((_req, res, next) => {
    // Exposes the nonce of the request, to compare it with the HTML.
    res.setHeader('x-test-nonce', res.locals['cspNonce']);
    next();
  });
  server.use(angularHandler(engine, DEFAULT_APP_CONFIG));
  return server;
}

describe('angularHandler', () => {
  it('replaces every nonce placeholder with the nonce of the request', async () => {
    const app = appRendering(
      () =>
        new Response(
          '<app-root ngCspNonce="__CSP_NONCE__"></app-root><script nonce="__CSP_NONCE__"></script>',
          { headers: { 'content-type': 'text/html; charset=utf-8' } },
        ),
    );

    const response = await request(app, '/fr');
    const nonce = response.headers.get('x-test-nonce');
    const html = await response.text();

    expect(nonce).toBeTruthy();
    expect(html).not.toContain('__CSP_NONCE__');
    expect(html.split(`"${nonce}"`)).toHaveLength(3);
  });

  it('sends engine redirects as regular Express redirects', async () => {
    const app = appRendering(
      () =>
        new Response(null, {
          status: 301,
          headers: { location: '/webcomponents/fr' },
        }),
    );

    const response = await request(app, '/');

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('/webcomponents/fr');
    expect(response.headers.get('content-length')).not.toBeNull();
  });
});
