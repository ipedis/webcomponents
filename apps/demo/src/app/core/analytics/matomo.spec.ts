import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_APP_CONFIG, PublicAppConfig } from '../config/app-config';
import { APP_CONFIG } from '../config/app-config.providers';
import { provideMatomo } from './matomo';

type MatomoWindow = Window & { _paq?: unknown[][] };

function withMatomo(matomo: Partial<PublicAppConfig['matomo']>) {
  return {
    provide: APP_CONFIG,
    useValue: {
      ...DEFAULT_APP_CONFIG,
      matomo: { ...DEFAULT_APP_CONFIG.matomo, ...matomo },
    },
  };
}

/** Builds the injector, which runs the app initializers. */
function start(...providers: unknown[]): Document {
  TestBed.configureTestingModule({
    providers: [provideMatomo(), ...(providers as [])],
  });
  return TestBed.inject(DOCUMENT);
}

function matomoScripts(document: Document): HTMLScriptElement[] {
  return Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[src*="matomo"]'),
  );
}

describe('provideMatomo', () => {
  afterEach(() => {
    matomoScripts(document).forEach((script) => script.remove());
    delete (window as MatomoWindow)._paq;
  });

  it('loads the tracker with the configured URL and site id', () => {
    const doc = start(
      withMatomo({ url: 'https://matomo.example.com', siteId: '12' }),
    );

    expect(matomoScripts(doc).map((s) => s.src)).toEqual([
      'https://matomo.example.com/matomo.js',
    ]);
    expect((doc.defaultView as MatomoWindow)._paq).toEqual([
      ['trackPageView'],
      ['enableLinkTracking'],
      ['setTrackerUrl', 'https://matomo.example.com/matomo.php'],
      ['setSiteId', '12'],
    ]);
  });

  it('does nothing when Matomo is disabled', () => {
    const doc = start(withMatomo({ enabled: false }));

    expect(matomoScripts(doc)).toEqual([]);
    expect((doc.defaultView as MatomoWindow)._paq).toBeUndefined();
  });

  it('does nothing on the server', () => {
    const doc = start(withMatomo({}), {
      provide: PLATFORM_ID,
      useValue: 'server',
    });

    expect(matomoScripts(doc)).toEqual([]);
  });
});
