import { LocationStrategy } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs/operators';
import { APP_CONFIG } from '../../core/config/app-config.providers';

/** Path of the page on the design system site, per language (route data). */
export type Backlink = Record<string, string>;

/** Used when the route declares no backlink: the web components index. */
const DEFAULT_BACKLINK_PATH = '/composants-web/';

/** Target and accessible label (translation key) of the "Back" link. */
export interface BackButton {
  href: string;
  ariaKey: string;
}

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
  private readonly locationStrategy = inject(LocationStrategy);
  private readonly config = inject(APP_CONFIG);

  // A signal, so the OnPush view refreshes when a navigation updates it.
  readonly back = signal<BackButton>({
    href: '/',
    ariaKey: 'common.label.backAria',
  });

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.back.set(this.resolveBackButton()));
  }

  /**
   * Locally (HOME_REDIRECT=false), the demo pages go back to the list of
   * demos. Otherwise, and on the list itself, back to the design system.
   */
  private resolveBackButton(): BackButton {
    if (!this.config.homeRedirect && !this.isHomePage()) {
      return {
        href: this.locationStrategy.prepareExternalUrl(`/${this.activeLang}`),
        ariaKey: 'common.label.backToDemosAria',
      };
    }

    return {
      href: this.designSystemLink(),
      ariaKey: 'common.label.backAria',
    };
  }

  /** Page of the design system declared by the route (`backlink` data). */
  private designSystemLink(): string {
    const { data } = this.getDeepestChild(this.route).snapshot;
    const backlink = data['backlink'] as Backlink | undefined;
    if (!backlink) {
      return this.config.designSystemUrl + DEFAULT_BACKLINK_PATH;
    }

    const path = backlink[this.activeLang];
    return path ? this.config.designSystemUrl + path : '/';
  }

  /** The language root (`/fr`, `/en`): the list of demos. */
  private isHomePage(): boolean {
    const url = this.router.parseUrl(this.router.url);
    return (url.root.children['primary']?.segments.length ?? 0) <= 1;
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
