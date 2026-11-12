import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { DEFAULT_APP_CONFIG } from '../../core/config/app-config';
import { APP_CONFIG } from '../../core/config/app-config.providers';
import { HeaderComponent } from './header.component';

@Component({ selector: 'app-dummy', template: '' })
class DummyComponent {}

const DESIGN_SYSTEM_URL = 'https://staging-design.example.com';

describe('HeaderComponent back link', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  function setUp(lang = 'fr', homeRedirect = true): void {
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
          { path: 'not-found', component: DummyComponent },
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
          { path: ':lang', component: DummyComponent, data: { home: true } },
        ]),
        { provide: APP_BASE_HREF, useValue: '/webcomponents/' },
        {
          provide: APP_CONFIG,
          useValue: {
            ...DEFAULT_APP_CONFIG,
            designSystemUrl: DESIGN_SYSTEM_URL,
            homeRedirect,
          },
        },
      ],
    });
    TestBed.inject(TranslocoService).setActiveLang(lang);
    fixture = TestBed.createComponent(HeaderComponent);
  }

  /**
   * Navigates, then reads the link as rendered. No detectChanges(): Angular
   * refreshes the OnPush view on its own, as in the app.
   */
  async function backLinkAfterNavigatingTo(url: string): Promise<string> {
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    const link: HTMLAnchorElement =
      fixture.nativeElement.querySelector('.back-wrapper a');
    return link.getAttribute('href') ?? '';
  }

  it('points to the French page of the design system', async () => {
    setUp();
    expect(await backLinkAfterNavigatingTo('/fr/tooltip')).toBe(
      `${DESIGN_SYSTEM_URL}/composants-web/infobulle/`,
    );
  });

  it('points to the English page of the design system', async () => {
    setUp('en');
    expect(await backLinkAfterNavigatingTo('/en/tooltip')).toBe(
      `${DESIGN_SYSTEM_URL}/en/web-components/tooltip/`,
    );
  });

  it('falls back to the web components index without backlink', async () => {
    setUp();
    expect(await backLinkAfterNavigatingTo('/fr/no-backlink')).toBe(
      `${DESIGN_SYSTEM_URL}/composants-web/`,
    );
  });

  it('falls back to the app root when the language has no backlink', async () => {
    setUp('en');
    expect(await backLinkAfterNavigatingTo('/en/fr-only')).toBe('/');
  });

  it('updates the rendered link on each navigation', async () => {
    setUp();
    await backLinkAfterNavigatingTo('/fr/tooltip');
    expect(await backLinkAfterNavigatingTo('/fr/no-backlink')).toBe(
      `${DESIGN_SYSTEM_URL}/composants-web/`,
    );
  });

  describe('language switch', () => {
    function label(): string {
      return fixture.nativeElement
        .querySelector('.lang-desktop')
        .textContent.trim();
    }

    it('offers the other language', async () => {
      setUp('fr');
      await fixture.whenStable();
      expect(label()).toBe('Anglais');
    });

    it('follows a change of the active language', async () => {
      setUp('fr');
      await fixture.whenStable();

      TestBed.inject(TranslocoService).setActiveLang('en');
      await fixture.whenStable();

      expect(label()).toBe('French');
    });
  });

  describe('without the home redirect (local testing)', () => {
    it('goes back to the list of demos from a demo page', async () => {
      setUp('en', false);
      expect(await backLinkAfterNavigatingTo('/en/tooltip')).toBe(
        '/webcomponents/en',
      );
      expect(fixture.componentInstance.back().ariaKey).toBe(
        'common.label.backToDemosAria',
      );
    });

    it('goes back to the list of demos from the not-found page', async () => {
      setUp('fr', false);
      expect(await backLinkAfterNavigatingTo('/not-found')).toBe(
        '/webcomponents/fr',
      );
    });

    it('keeps the design system link on the list of demos', async () => {
      setUp('fr', false);
      expect(await backLinkAfterNavigatingTo('/fr')).toBe(
        `${DESIGN_SYSTEM_URL}/composants-web/`,
      );
      expect(fixture.componentInstance.back().ariaKey).toBe(
        'common.label.backAria',
      );
    });
  });
});
