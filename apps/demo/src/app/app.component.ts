import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { SkipLinkComponent } from './components/skip-link/skip-link.component';
import { TitleService } from './core/services/title.service';
import { TranslocoService } from '@jsverse/transloco';
@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SkipLinkComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private titleService = inject<TitleService>(TitleService);
  private transloco = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);
  private doc = inject(DOCUMENT);
  ngOnInit() {
    this.titleService.init();
    if (isPlatformBrowser(this.platformId)) {
      this.transloco.langChanges$.subscribe((lang) => {
        this.doc.documentElement.lang = lang;
      });
    }
  }
}
