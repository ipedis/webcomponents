import { ChangeDetectionStrategy, inject, Component } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-toogle',
  standalone: true,
  imports: [Highlight, TranslocoPipe],
  templateUrl: './doc-toogle.component.html',
  styleUrl: './doc-toogle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocToogleComponent {
  private readonly translocoService = inject(TranslocoService);

  import = `import '../node_modules/ip-toggle/dist/ip-toggle/ip-toggle.esm';`;
  example = `
  <ip-toggle 
    aria-label="Toggle notifications on or off"
  >
    <label slot="switch-label">Activate strong authentication</label>
  </ip-toggle>`;
  custom = `ip-toggle {
    --primary-color: #006342;
    --secondary-color: #000000;
    --font-family: Arial, sans-serif;
    --text-color: #333333;
    }
`;
  event = `
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('ip-toggle');
  if (toggle) {
    toggle.addEventListener('toggleChange', (event) => {
      console.log('Toggle changed:', event.detail);
    });
  }
});
  `;
}
