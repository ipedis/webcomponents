import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly translocoService = inject(TranslocoService);
  private readonly router = inject(Router);

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
}
