import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_APP_CONFIG } from '../../core/config/app-config';
import { APP_CONFIG } from '../../core/config/app-config.providers';
import { HeaderComponent } from './header.component';

@Component({ selector: 'app-dummy', template: '' })
class DummyComponent {}

const DESIGN_SYSTEM_URL = 'https://staging-design.example.com';

describe('HeaderComponent back link', () => {
  async function headerAt(url: string, lang = 'fr'): Promise<HeaderComponent> {
    TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        TranslocoTestingModule.forRoot({
          langs: { fr: {}, en: {} },
          translocoConfig: { availableLangs: ['fr', 'en'], defaultLang: 'fr' },
        }),
      ],
      providers: [
        provideRouter([
          {
            path: ':lang/tooltip',
            component: DummyComponent,
            data: {
              backlink: {
                fr: '/composants-web/infobulle/',
                en: '/en/web-components/tooltip/',
              },
            },
          },
          {
            path: ':lang/fr-only',
            component: DummyComponent,
            data: { backlink: { fr: '/composants-web/' } },
          },
          { path: ':lang/no-backlink', component: DummyComponent },
        ]),
        {
          provide: APP_CONFIG,
          useValue: {
            ...DEFAULT_APP_CONFIG,
            designSystemUrl: DESIGN_SYSTEM_URL,
          },
        },
      ],
    });
    TestBed.inject(TranslocoService).setActiveLang(lang);
    const header = TestBed.createComponent(HeaderComponent).componentInstance;
    await TestBed.inject(Router).navigateByUrl(url);
    return header;
  }

  it('points to the French page of the design system', async () => {
    const header = await headerAt('/fr/tooltip');
    expect(header.backLink()).toBe(
      `${DESIGN_SYSTEM_URL}/composants-web/infobulle/`,
    );
  });

  it('points to the English page of the design system', async () => {
    const header = await headerAt('/en/tooltip', 'en');
    expect(header.backLink()).toBe(
      `${DESIGN_SYSTEM_URL}/en/web-components/tooltip/`,
    );
  });

  it('falls back to the web components index without backlink', async () => {
    const header = await headerAt('/fr/no-backlink');
    expect(header.backLink()).toBe(`${DESIGN_SYSTEM_URL}/composants-web/`);
  });

  it('falls back to the app root when the language has no backlink', async () => {
    const header = await headerAt('/en/fr-only', 'en');
    expect(header.backLink()).toBe('/');
  });
});
