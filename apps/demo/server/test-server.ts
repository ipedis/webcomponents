import type { Express } from 'express';
import type { AddressInfo } from 'node:net';

/** Serves `app` on a free port for one request, then closes it. */
export async function request(
  app: Express,
  path: string,
): Promise<globalThis.Response> {
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once('listening', resolve));
  const { port } = server.address() as AddressInfo;
  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, {
      redirect: 'manual',
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}
