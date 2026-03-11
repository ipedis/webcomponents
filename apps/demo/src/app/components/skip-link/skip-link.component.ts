import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-skip-link',
  templateUrl: './skip-link.component.html',
  imports: [TranslocoPipe],
  standalone: true,
  styleUrls: ['./skip-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipLinkComponent {
  private readonly translocoService = inject(TranslocoService);

  public skipToTargetId(event: Event, targetId: string): void {
    event.stopPropagation();
    event.preventDefault();

    const elementToFocus = document.getElementById(targetId);
    elementToFocus?.focus();
  }
}
