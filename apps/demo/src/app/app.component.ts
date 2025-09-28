import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { AsideComponent } from './features/aside/aside.component';
import { FooterComponent } from './features/footer/footer.component';
import { SkipLinkComponent } from './components/skip-link/skip-link.component';
import { TitleService } from './core/services/title.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsideComponent,
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
  private titleService = inject<TitleService>(TitleService);

  isMenuVisible = false;

  ngOnInit() {
    this.titleService.init();
  }
  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
  closeMenu() {
    this.isMenuVisible = false;
  }
}
