import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { TRANSLOCO_LOADER } from '@jsverse/transloco';
import { appConfig } from './app.config';
import { TranslocoServerLoader } from './transloco.server.loader';
import { serverRoutes } from './app.routes.server';
import { provideServerAppConfig } from './core/config/app-config.providers';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: TRANSLOCO_LOADER, useClass: TranslocoServerLoader },
    // Overrides the browser provider declared in app.config.ts.
    ...provideServerAppConfig(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
