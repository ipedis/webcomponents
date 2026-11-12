/**
 * @jest-environment node
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// A key missing from a translation file is shown as is on the page, such as
// "alert.docs.propertyTable.required". Every key the templates pass to the
// transloco pipe must exist in each language.

const APP_DIR = __dirname;
const I18N_DIR = join(__dirname, '../../public/assets/i18n');
const LANGS = ['fr', 'en'];

/** A literal key piped to transloco: `'pages.home.title' | transloco`. */
const PIPED_KEY = /'([a-zA-Z][\w-]*(?:\.[\w-]+)+)'\s*\|\s*transloco/g;

function flatKeys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') {
    return [prefix];
  }
  return Object.entries(value).flatMap(([key, child]) =>
    flatKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

function usedKeys(): Set<string> {
  const keys = new Set<string>();
  const files = readdirSync(APP_DIR, { recursive: true, encoding: 'utf-8' });
  for (const file of files) {
    if (!/\.(html|ts)$/.test(file) || file.endsWith('.spec.ts')) {
      continue;
    }
    const source = readFileSync(join(APP_DIR, file), 'utf-8');
    for (const [, key] of source.matchAll(PIPED_KEY)) {
      keys.add(key);
    }
  }
  return keys;
}

describe('translation keys', () => {
  const used = usedKeys();

  it('finds the keys of the templates', () => {
    expect(used.size).toBeGreaterThan(100);
  });

  it.each(LANGS)('are all defined in %s.json', (lang) => {
    const defined = new Set(
      flatKeys(
        JSON.parse(readFileSync(join(I18N_DIR, `${lang}.json`), 'utf-8')),
      ),
    );

    expect([...used].filter((key) => !defined.has(key))).toEqual([]);
  });
});
