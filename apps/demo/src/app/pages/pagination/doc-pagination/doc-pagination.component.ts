import { ChangeDetectionStrategy, inject, Component } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-pagination',
  standalone: true,
  imports: [Highlight, TranslocoPipe],
  templateUrl: './doc-pagination.component.html',
  styleUrl: './doc-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPaginationComponent {
  private readonly translocoService = inject(TranslocoService);

  installationScript = `npm install ip-pagination`;
  import = `import '../node_modules/ip-pagination/dist/ip-pagination/ip-pagination.esm';`;
  custom = `
  ip-pagination {
    --pagination-button-background: #006342;
    --pagination-button-active-background: #333333;
    --pagination-button-border-radius: 14px;
  }`;
  handlingEventExample = `const pagination = document.querySelector('ip-pagination');
  
pagination?.addEventListener('pageChanged', (event) => {
  const newPage = event.detail;
  console.log('Page changed to:', newPage);
});
`;
}
