import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private router = inject(Router);
  private titleService = inject(Title);


  init() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((event) => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(title);
        }
      });
  }
}
