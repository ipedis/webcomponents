import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  provideTransloco,
  Translation,
  TranslocoLoader,
  TranslocoService,
} from '@jsverse/transloco';
import {
  firstValueFrom,
  isObservable,
  map,
  Observable,
  throwError,
  timer,
} from 'rxjs';
import { langGuard } from './lang.guard';

/** Answers after a delay, like the HTTP loader of the browser. */
class SlowLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    return timer(10).pipe(map(() => ({ hello: `hello (${lang})` })));
  }
}

/** Fails, like the server loader when a translation file is missing. */
class FailingLoader implements TranslocoLoader {
  getTranslation(): Observable<Translation> {
    return throwError(() => new Error('Translation file not found'));
  }
}

function runGuard(
  lang: string,
  loader: new () => TranslocoLoader = SlowLoader,
) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideTransloco({
        config: { availableLangs: ['fr', 'en'], defaultLang: 'fr' },
        loader,
      }),
    ],
  });
  const route = {
    paramMap: convertToParamMap({ lang }),
  } as ActivatedRouteSnapshot;
  return TestBed.runInInjectionContext(() =>
    langGuard(route, {} as RouterStateSnapshot),
  );
}

describe('langGuard', () => {
  // Without zone.js, nothing else holds the server render until the
  // translation is loaded: the navigation has to wait for it.
  it('lets the navigation through once the translation is loaded', async () => {
    const result = runGuard('en');

    expect(isObservable(result)).toBe(true);
    expect(await firstValueFrom(result as Observable<boolean>)).toBe(true);
    const transloco = TestBed.inject(TranslocoService);
    expect(transloco.getActiveLang()).toBe('en');
    expect(transloco.translate('hello', {}, 'en')).toBe('hello (en)');
  });

  it('does not block the page when the translation fails to load', async () => {
    // Transloco logs the failure: expected here, kept out of the test output.
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const result = runGuard('en', FailingLoader);

    expect(await firstValueFrom(result as Observable<boolean>)).toBe(true);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('sends an unknown language to the not-found page', () => {
    const result = runGuard('de');

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe(
      '/not-found',
    );
  });
});
