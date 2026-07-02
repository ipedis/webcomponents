import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly translocoService = inject(TranslocoService);
}
