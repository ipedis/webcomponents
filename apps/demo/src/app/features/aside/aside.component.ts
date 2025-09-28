import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-demo-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  @Output() focusCards = new EventEmitter<void>();
  @Output() linkClicked = new EventEmitter<void>();
  isOpen: { [key: string]: boolean } = {};
  isMenuVisible = false;

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
