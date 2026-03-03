import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable({ providedIn: 'root' })
export class TranslocoServerLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    const filePath = join(
      process.cwd(),
      `apps/demo/public/assets/i18n/${lang}.json`,
    );
    return Promise.resolve(JSON.parse(readFileSync(filePath, 'utf-8')));
  }
}
