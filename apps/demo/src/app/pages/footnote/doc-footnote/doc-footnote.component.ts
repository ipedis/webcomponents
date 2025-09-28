import { Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-footnote',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-footnote.component.html',
  styleUrl: './doc-footnote.component.scss',
})
export class DocFootnoteComponent {
  installationScript = `npm install ip-footnote`;
  import = `import '../node_modules/ip-footnote/dist/ip-footnote/ip-footnote.esm';`;
  example = `<p>
  Here is a sentence with a footnote reference
  <sup><a href="#footnote-1" id="ref1">1</a></sup>
</p>
<ip-footnote
  id="footnote-1"
  identifier="1"
  text="This is a detailed explanation or reference for the footnote."
>
</ip-footnote>
`;

  custom1 = `ip-footnote {
  --footnote-font-color: #006342;
  --footnote-font-size: 16px;
  --footnote-border-left: 2px solid #000000;
}
`;
}
