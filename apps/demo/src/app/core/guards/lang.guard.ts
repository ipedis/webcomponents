import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { catchError, map, of } from 'rxjs';

const SUPPORTED_LANGS = ['fr', 'en'];

export const langGuard: CanActivateFn = (route) => {
  const translocoService = inject(TranslocoService);
  const router = inject(Router);
  const lang = route.paramMap.get('lang');

  if (lang && SUPPORTED_LANGS.includes(lang)) {
    translocoService.setActiveLang(lang);
    // The navigation waits for the translation. Without zone.js, it is what
    // holds the server render until the page can be rendered translated.
    // A translation that fails to load does not block the page, as before.
    return translocoService.load(lang).pipe(
      map(() => true),
      catchError(() => of(true)),
    );
  }

  return router.createUrlTree(['/not-found']);
};
