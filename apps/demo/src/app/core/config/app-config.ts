/**
 * Configuration shared by the SSR server and the browser.
 *
 * It is serialized into the rendered HTML (TransferState), so it must only
 * hold public values. This file has no Angular import so the Express server
 * can use it too.
 */
export interface PublicAppConfig {
  designSystemUrl: string;
  matomo: {
    enabled: boolean;
    url: string;
    siteId: string;
  };
}

/** Production values, used when no environment variable overrides them. */
export const DEFAULT_APP_CONFIG: PublicAppConfig = {
  designSystemUrl: 'https://design.ipedis.com',
  matomo: {
    enabled: true,
    url: 'https://ipedis.matomo.cloud',
    siteId: '71',
  },
};

/** Context the Express server passes to the Angular engine for each request. */
export interface AppRequestContext {
  appConfig: PublicAppConfig;
}
