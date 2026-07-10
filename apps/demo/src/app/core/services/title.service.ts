import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { filter, map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);
  private transloco = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);

  init() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) route = route.firstChild;
          return {
            title: route.snapshot.data['title'],
            description: route.snapshot.data['description'],
          };
        }),
        switchMap(({ title, description }) =>
          combineLatest([
            title ? this.transloco.selectTranslate(title) : of(''),
            description ? this.transloco.selectTranslate(description) : of(''),
          ]),
        ),
      )
      .subscribe(([title, description]) => {
        if (title) this.title.setTitle(title);
        if (description) {
          this.meta.updateTag({ name: 'description', content: description });
        }
      });
  }
}
