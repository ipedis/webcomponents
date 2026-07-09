import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';

// The Angular router cannot express an external redirect, so the language
// root routes render this component instead. In production the Express
// server redirects before rendering ever happens; this only runs during
// `ng serve` and client-side navigations.
@Component({
  selector: 'app-external-redirect',
  standalone: true,
  template: `
    <p>
      <a href="https://design.ipedis.com">design.ipedis.com</a>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ExternalRedirectComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.location.replace('https://design.ipedis.com');
    }
  }
}
