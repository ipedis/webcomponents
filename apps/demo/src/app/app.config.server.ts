import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TRANSLOCO_LOADER } from '@jsverse/transloco';
import { appConfig } from './app.config';
import { TranslocoServerLoader } from './transloco.server.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: TRANSLOCO_LOADER, useClass: TranslocoServerLoader },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
