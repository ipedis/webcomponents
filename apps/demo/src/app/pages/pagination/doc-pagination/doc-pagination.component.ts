import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-pagination',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-pagination.component.html',
  styleUrl: './doc-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPaginationComponent {
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
