import { Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-show-more',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-show-more.component.html',
  styleUrl: './doc-show-more.component.scss',
})
export class DocShowMoreComponent {
  installationScript = `npm install show-more`;
  import = `import '../node_modules/ip-show-more/dist/ip-show-more/ip-show-more.esm';`;
  example = `<ip-show-more show-less-text="Voir moins" show-more-text="Voir plus">
  <div slot="content">-- Expanded content goes here --</div>
</ip-show-more>`;
  custom = `ip-show-more {
  --ip-primary-color: #006342;
  --ip-secondary-color: #000000;
}
`;
}
