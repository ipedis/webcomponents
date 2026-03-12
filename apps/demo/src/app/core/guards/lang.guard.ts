import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

const SUPPORTED_LANGS = ['fr', 'en'];

export const langGuard: CanActivateFn = (route) => {
  const translocoService = inject(TranslocoService);
  const router = inject(Router);
  const lang = route.paramMap.get('lang');

  if (lang && SUPPORTED_LANGS.includes(lang)) {
    translocoService.setActiveLang(lang);
    return true;
  }

  return router.createUrlTree(['/not-found']);
};
