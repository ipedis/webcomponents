import {
  EnvironmentProviders,
  InjectionToken,
  Provider,
  REQUEST_CONTEXT,
  TransferState,
  inject,
  makeStateKey,
  provideEnvironmentInitializer,
} from '@angular/core';
import {
  AppRequestContext,
  DEFAULT_APP_CONFIG,
  PublicAppConfig,
} from './app-config';

export const APP_CONFIG = new InjectionToken<PublicAppConfig>('APP_CONFIG');

const APP_CONFIG_STATE_KEY = makeStateKey<PublicAppConfig>('appConfig');

/** Browser: reads the configuration the server wrote into the page. */
export function provideAppConfig(): Provider {
  return {
    provide: APP_CONFIG,
    useFactory: () =>
      inject(TransferState).get(APP_CONFIG_STATE_KEY, DEFAULT_APP_CONFIG),
  };
}

/**
 * Server: takes the configuration from the request context and writes it
 * into the page for the browser. Without a request context (build-time route
 * extraction), the defaults apply.
 */
export function provideServerAppConfig(): (Provider | EnvironmentProviders)[] {
  return [
    {
      provide: APP_CONFIG,
      useFactory: () => {
        const context = inject(REQUEST_CONTEXT, {
          optional: true,
        }) as Partial<AppRequestContext> | null;
        return context?.appConfig ?? DEFAULT_APP_CONFIG;
      },
    },
    // Eager, so the state is written even if no component injects APP_CONFIG.
    provideEnvironmentInitializer(() => {
      inject(TransferState).set(APP_CONFIG_STATE_KEY, inject(APP_CONFIG));
    }),
  ];
}
