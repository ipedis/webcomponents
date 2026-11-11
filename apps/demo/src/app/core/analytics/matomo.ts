import { isPlatformBrowser } from '@angular/common';
import {
  DOCUMENT,
  EnvironmentProviders,
  PLATFORM_ID,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { PublicAppConfig } from '../config/app-config';
import { APP_CONFIG } from '../config/app-config.providers';

type MatomoQueue = unknown[][];
type MatomoWindow = Window & { _paq?: MatomoQueue };

/**
 * Starts Matomo in the browser when APP_CONFIG enables it. Replaces the
 * inline snippet of index.html, whose URL and site id were hard-coded.
 * The Matomo host is allowed by the CSP only when tracking is enabled.
 */
export function provideMatomo(): EnvironmentProviders {
  return provideAppInitializer(() => {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    const { matomo } = inject(APP_CONFIG);
    if (matomo.enabled) {
      startMatomo(inject(DOCUMENT), matomo);
    }
  });
}

/** Same calls, in the same order, as the official Matomo snippet. */
function startMatomo(
  document: Document,
  { url, siteId }: PublicAppConfig['matomo'],
): void {
  const window = document.defaultView as MatomoWindow;
  const paq = (window._paq ??= []);
  paq.push(['trackPageView']);
  paq.push(['enableLinkTracking']);
  paq.push(['setTrackerUrl', `${url}/matomo.php`]);
  paq.push(['setSiteId', siteId]);

  const script = document.createElement('script');
  script.async = true;
  script.src = `${url}/matomo.js`;
  document.head.appendChild(script);
}
