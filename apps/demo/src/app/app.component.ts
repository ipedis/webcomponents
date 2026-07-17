import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { SkipLinkComponent } from './components/skip-link/skip-link.component';
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
  private transloco = inject(TranslocoService);
  private doc = inject(DOCUMENT);
  ngOnInit() {
    this.transloco.langChanges$.subscribe((lang) => {
      this.doc.documentElement.lang = lang;
    });
  }
}
