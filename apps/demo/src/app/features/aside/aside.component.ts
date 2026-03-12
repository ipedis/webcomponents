import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-demo-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  private readonly translocoService = inject(TranslocoService);

  @Output() focusCards = new EventEmitter<void>();
  @Output() linkClicked = new EventEmitter<void>();
  isOpen: { [key: string]: boolean } = {};
  isMenuVisible = false;

  get activeLang(): string {
    return this.translocoService.getActiveLang();
  }

  toggleSection(section: string): void {
    this.isOpen[section] = !this.isOpen[section];
  }

  handleKeydown(event: KeyboardEvent, section: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleSection(section);
    }
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }
}
