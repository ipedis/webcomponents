import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { appRoutes } from './app.routes';
import { DEFAULT_APP_CONFIG } from './core/config/app-config';
import { APP_CONFIG } from './core/config/app-config.providers';
import { ExternalRedirectComponent } from './pages/external-redirect/external-redirect.component';
import { HomeComponent } from './pages/home/home.component';

// The two language root routes share the same path and only canMatch tells
// them apart: these tests fail if their order is swapped.
describe('language root route', () => {
  async function componentAt(url: string, homeRedirect: boolean) {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule.forRoot({
          langs: { fr: {}, en: {} },
          translocoConfig: { availableLangs: ['fr', 'en'], defaultLang: 'fr' },
        }),
      ],
      providers: [
        provideRouter(appRoutes),
        {
          provide: APP_CONFIG,
          useValue: { ...DEFAULT_APP_CONFIG, homeRedirect },
        },
        // Keeps ExternalRedirectComponent from navigating away (browser only).
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    return harness.routeDebugElement?.componentInstance;
  }

  it('redirects to the design system by default', async () => {
    expect(await componentAt('/fr', true)).toBeInstanceOf(
      ExternalRedirectComponent,
    );
  });

  it('lists the demos without the home redirect', async () => {
    expect(await componentAt('/en', false)).toBeInstanceOf(HomeComponent);
  });
});
