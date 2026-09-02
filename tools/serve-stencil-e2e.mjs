import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const port = Number.parseInt(process.argv[2], 10);

if (!Number.isInteger(port)) {
  throw new Error('A valid port is required.');
}

const stencilBin = resolve(
  import.meta.dirname,
  '../node_modules/@stencil/core/bin/stencil',
);
const build = spawnSync(process.execPath, [stencilBin, 'build', '--dev'], {
  cwd: process.cwd(),
  stdio: 'inherit',
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const publicRoot = resolve(process.cwd(), 'www');
const publicRootPrefix = `${publicRoot}${sep}`;
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

createServer((request, response) => {
  const pathname = decodeURIComponent(
    new URL(request.url, 'http://127.0.0.1').pathname,
  );

  if (pathname === '/ping') {
    response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('ok');
    return;
  }

  const relativePath = pathname.replace(/^[/\\]+/, '');
  let filePath = resolve(publicRoot, relativePath || 'index.html');

  if (filePath !== publicRoot && !filePath.startsWith(publicRootPrefix)) {
    response.writeHead(403).end();
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404).end();
    return;
  }

  response.writeHead(200, {
    'content-type':
      contentTypes[extname(filePath)] ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Stencil E2E server listening on http://127.0.0.1:${port}`);
});
