import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private router = inject(Router);
  private title = inject(Title);
  private transloco = inject(TranslocoService);

  init() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) route = route.firstChild;
          return route.snapshot.data['title'];
        }),
        switchMap((titleKey) =>
          titleKey ? this.transloco.selectTranslate(titleKey) : of(''),
        ),
      )
      .subscribe((title) => title && this.title.setTitle(title));
  }
}
