import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    const relativePath = `assets/i18n/${lang}.json`;
    // The Docker image only ships the build output (browser/ next to server/,
    // cwd = /usr/app), while `ng serve` runs from the repo root.
    const candidates = [
      join(process.cwd(), 'browser', relativePath),
      join(process.cwd(), 'apps/demo/public', relativePath),
      join(process.cwd(), 'dist/demo/browser', relativePath),
    ];
    const filePath = candidates.find((path) => existsSync(path));
    if (!filePath) {
      return Promise.reject(
        new Error(
          `Translation file for "${lang}" not found. Tried: ${candidates.join(', ')}`,
        ),
      );
    }
    return Promise.resolve(JSON.parse(readFileSync(filePath, 'utf-8')));
  }
}
