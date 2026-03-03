import { ChangeDetectionStrategy, inject, Component } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly translocoService = inject(TranslocoService);
}
