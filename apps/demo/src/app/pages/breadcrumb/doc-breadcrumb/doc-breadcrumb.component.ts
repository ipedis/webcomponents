import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-breadcrumb',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-breadcrumb.component.html',
  styleUrl: './doc-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocBreadcrumbComponent {
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
