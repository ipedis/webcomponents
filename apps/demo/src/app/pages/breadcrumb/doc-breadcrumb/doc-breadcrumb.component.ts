import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-doc-breadcrumb',
  standalone: true,
  imports: [Highlight, TranslocoPipe],
  templateUrl: './doc-breadcrumb.component.html',
  styleUrl: './doc-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocBreadcrumbComponent {
  private readonly translocoService = inject(TranslocoService);

  import = `import '../node_modules/ip-breadcrumb/dist/ip-breadcrumb/ip-breadcrumb.esm';
`;
  installationScript = `npm install ip-breadcrumb`;
  example = `<ip-breadcrumb
  breadcrumb-title="Your Path"
  breadcrumb-items='[
    {"label": "Home", "link": "/home"},
    {"label": "Library", "link": "/library"},
    {"label": "Current Location"}]'
  prefix-aria-label="Navigate to"
  separator-icon=">"
></ip-breadcrumb>`;

  css = `ip-breadcrumb::part(title) {
  color: #305b38;
  font-size: 32px;
}

ip-breadcrumb {
  &::part(title) {
    color: #305b38;
    font-size: 32px;
  }
}
`;
}
