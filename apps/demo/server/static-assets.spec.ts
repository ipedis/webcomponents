import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readBuiltBasePath } from './static-assets';

describe('readBuiltBasePath', () => {
  let browserDistFolder: string;

  beforeEach(() => {
    browserDistFolder = mkdtempSync(join(tmpdir(), 'demo-browser-'));
  });

  afterEach(() => {
    rmSync(browserDistFolder, { recursive: true, force: true });
  });

  function writeIndex(html: string): void {
    writeFileSync(join(browserDistFolder, 'index.csr.html'), html);
  }

  it('reads the base href of the build without its trailing slash', () => {
    writeIndex('<head><base href="/webcomponents/"></head>');
    expect(readBuiltBasePath(browserDistFolder)).toBe('/webcomponents');
  });

  it('returns an empty prefix for an app served at the root', () => {
    writeIndex('<head><base href="/"></head>');
    expect(readBuiltBasePath(browserDistFolder)).toBe('');
  });

  it('returns null when there is no build (dev server)', () => {
    expect(readBuiltBasePath(browserDistFolder)).toBeNull();
  });

  it.each([
    ['no base tag', '<head></head>'],
    ['a relative base href', '<head><base href="webcomponents/"></head>'],
  ])('rejects an index with %s', (_case, html) => {
    writeIndex(html);
    expect(() => readBuiltBasePath(browserDistFolder)).toThrow(/base href/);
  });
});
