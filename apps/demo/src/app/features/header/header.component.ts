import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs/operators';
import { APP_CONFIG } from '../../core/config/app-config.providers';

/** Path of the page on the design system site, per language (route data). */
export type Backlink = Record<string, string>;

/** Used when the route declares no backlink: the web components index. */
const DEFAULT_BACKLINK_PATH = '/composants-web/';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly designSystemUrl = inject(APP_CONFIG).designSystemUrl;

  backLink = '/';

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.getDeepestChild(this.route);
        const backlink = child.snapshot.data?.['backlink'] as
          Backlink | undefined;
        this.backLink = this.resolveBackLink(backlink);
      });
  }

  private resolveBackLink(backlink: Backlink | undefined): string {
    if (!backlink) {
      return this.designSystemUrl + DEFAULT_BACKLINK_PATH;
    }
    const path = backlink[this.activeLang];
    return path ? this.designSystemUrl + path : '/';
  }

  get activeLang(): string {
    return this.translocoService.getActiveLang();
  }

  get nextLang(): string {
    return this.activeLang === 'fr' ? 'Anglais' : 'French';
  }

  toggleLang(): void {
    const newLang = this.activeLang === 'fr' ? 'en' : 'fr';
    const currentUrl = this.router.url;
    const newUrl = currentUrl.replace(/^\/(fr|en)/, `/${newLang}`);
    this.router.navigateByUrl(newUrl);
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
