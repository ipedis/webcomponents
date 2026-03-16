import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs/operators';

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

  backLink = '/';

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.getDeepestChild(this.route);
        const data = child.snapshot.data;
        if (data?.['backlink']) {
          const lang = this.activeLang;
          this.backLink = data['backlink'][lang] || '/';
        } else {
          this.backLink = 'https://design.ipedis.com/composants-web/';
        }
      });
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
