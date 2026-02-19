import { ChangeDetectionStrategy, inject, Component } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-table',
  standalone: true,
  imports: [Highlight, TranslocoPipe],
  templateUrl: './doc-table.component.html',
  styleUrl: './doc-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTableComponent {
  private readonly translocoService = inject(TranslocoService);

  installationScript = `npm install ip-table`;
  import = `import '../node_modules/ip-table/dist/ip-table/ip-table.esm';`;
  example = `<ip-table
  columns='[
      { "header": "Name" , "type": "string"},
      { "header": "Age", "type": "number" },
      ]'
  rows='[
      {"Name":"Benoit", "Age":25}
      {"Name":"Linda", "Age":23}
    ]'
>
</ip-table>`;
  custom = `ip-table {
  --primary-color: #006342;
  --secondary-color: #000000;
}
`;
}
