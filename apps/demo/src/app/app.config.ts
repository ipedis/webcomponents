import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoLoader } from './transloco.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        xml: () => import('highlight.js/lib/languages/xml'),
        css: () => import('highlight.js/lib/languages/css'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        bash: () => import('highlight.js/lib/languages/bash'),
      },
    }),
    provideClientHydration(withNoIncrementalHydration()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withXhr()),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoLoader,
    }),
  ],
};
