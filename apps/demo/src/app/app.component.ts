import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { SkipLinkComponent } from './components/skip-link/skip-link.component';
import { TitleService } from './core/services/title.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SkipLinkComponent,
    CommonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  constructor(@Inject(TitleService) private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.init();
  }
}
