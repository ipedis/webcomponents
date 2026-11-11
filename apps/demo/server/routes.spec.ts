/**
 * @jest-environment node
 */
import express from 'express';
import { designSystemRedirects } from './routes';
import { request } from './test-server';

const DESIGN_SYSTEM_URL = 'https://staging-design.example.com';

describe('designSystemRedirects', () => {
  function app(basePath: string): express.Express {
    const server = express();
    server.use(designSystemRedirects(basePath, DESIGN_SYSTEM_URL));
    server.use((_req, res) => {
      res.status(204).end();
    });
    return server;
  }

  it.each(['/webcomponents', '/webcomponents/fr', '/webcomponents/en'])(
    'sends %s to the design system',
    async (path) => {
      const response = await request(app('/webcomponents'), path);
      expect(response.status).toBe(302);
      expect(response.headers.get('location')).toBe(DESIGN_SYSTEM_URL);
    },
  );

  it('redirects the root when the app is served at the root', async () => {
    const response = await request(app(''), '/');
    expect(response.headers.get('location')).toBe(DESIGN_SYSTEM_URL);
  });

  it('lets the demo pages through', async () => {
    const response = await request(
      app('/webcomponents'),
      '/webcomponents/fr/tooltip',
    );
    expect(response.status).toBe(204);
  });
});
