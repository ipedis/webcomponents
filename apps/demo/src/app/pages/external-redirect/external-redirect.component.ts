import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { APP_CONFIG } from '../../core/config/app-config.providers';

// The Angular router cannot express an external redirect, so the language
// root routes render this component instead. In production the Express
// server redirects before rendering ever happens; this only runs during
// `ng serve` and client-side navigations.
@Component({
  selector: 'app-external-redirect',
  standalone: true,
  template: `
    <p>
      <a [href]="designSystemUrl">{{ designSystemHost }}</a>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ExternalRedirectComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  protected readonly designSystemUrl = inject(APP_CONFIG).designSystemUrl;
  protected readonly designSystemHost = new URL(this.designSystemUrl).host;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.location.replace(this.designSystemUrl);
    }
  }
}
