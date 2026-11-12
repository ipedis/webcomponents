import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { CodeSnippetComponent } from './code-snippet.component';

// Change detection is left to Angular (autoDetectChanges + whenStable), so
// these tests check the view refreshes on its own after an event.

function setUp(): ComponentFixture<CodeSnippetComponent> {
  TestBed.configureTestingModule({
    imports: [
      CodeSnippetComponent,
      TranslocoTestingModule.forRoot({
        langs: { fr: {} },
        translocoConfig: { availableLangs: ['fr'], defaultLang: 'fr' },
      }),
    ],
    providers: [
      provideHighlightOptions({
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          css: () => import('highlight.js/lib/languages/css'),
        },
      }),
    ],
  });
  const fixture = TestBed.createComponent(CodeSnippetComponent);
  fixture.componentRef.setInput('htmlCode', '<p>Hello</p>');
  fixture.componentRef.setInput('cssCode', 'p { color: navy; }');
  fixture.autoDetectChanges();
  return fixture;
}

function tab(
  fixture: ComponentFixture<CodeSnippetComponent>,
  name: 'html' | 'css',
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(`[aria-controls="${name}-tab"]`);
}

function panel(
  fixture: ComponentFixture<CodeSnippetComponent>,
  name: 'html' | 'css',
): HTMLElement | null {
  return fixture.nativeElement.querySelector(`#${name}-tab`);
}

describe('CodeSnippetComponent tabs', () => {
  it('shows the HTML tab first', async () => {
    const fixture = setUp();
    await fixture.whenStable();

    expect(tab(fixture, 'html').getAttribute('aria-selected')).toBe('true');
    expect(tab(fixture, 'css').getAttribute('aria-selected')).toBe('false');
    expect(panel(fixture, 'html')).not.toBeNull();
    expect(panel(fixture, 'css')).toBeNull();
  });

  it('selects the CSS tab on click', async () => {
    const fixture = setUp();
    await fixture.whenStable();

    tab(fixture, 'css').click();
    await fixture.whenStable();

    expect(tab(fixture, 'css').getAttribute('aria-selected')).toBe('true');
    expect(tab(fixture, 'html').getAttribute('aria-selected')).toBe('false');
    expect(panel(fixture, 'css')).not.toBeNull();
    expect(panel(fixture, 'html')).toBeNull();
  });

  it('selects a tab with Enter or Space', async () => {
    const fixture = setUp();
    await fixture.whenStable();

    tab(fixture, 'css').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' }),
    );
    await fixture.whenStable();
    expect(tab(fixture, 'css').getAttribute('aria-selected')).toBe('true');

    tab(fixture, 'html').dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ' }),
    );
    await fixture.whenStable();
    expect(tab(fixture, 'html').getAttribute('aria-selected')).toBe('true');
  });
});
