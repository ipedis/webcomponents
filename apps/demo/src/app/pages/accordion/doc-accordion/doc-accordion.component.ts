import { Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-accordion',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-accordion.component.html',
  styleUrl: './doc-accordion.component.scss',
})
export class DocAccordionComponent {
  code = `import '../node_modules/ip-accordion/dist/ip-accordion/ip-accordion.esm';`;
  example = `<ip-accordion
  accordion-headers='[
        {
          "title":"Section 1",
          "iconPath": "assets/images/icon1.svg",
          "iconActivePath": "assets/images/icon1-active.svg",
          "btnAlt": "Open Section 1",
          "btnAltClose": "Close Section 1",
          "ariaText": "section-1"
        },
        {
          "title":"Section 2",
          "iconPath":"assets/images/icon2.svg",
          "iconActivePath": "assets/images/icon2-active.svg",
          "btnAlt": "Open Section 2",
          "btnAltClose": "Close Section 2",
          "ariaText": "section-2"
        },
        {
          "title":"Section 3",
          "iconPath":"assets/images/icon3.svg",
          "iconActivePath": "assets/images/icon3-active.svg",
          "btnAlt": "Open Section 3",
          "btnAltClose": "Close Section 3",
          "ariaText": "section-3"
        }
      ]'
  is-first-panel-open
  is-single-open
  title-tag="h4"
>
  <div slot="accordion-1">--content of Accessibilité--</div>
  <div slot="accordion-2">--content of Pdf Document--</div>
  <div slot="accordion-3">--content of Statistical--</div>
  <div slot="accordion-4">--content of Certification--</div>
  <div slot="accordion-5">--content of Legislation--</div>
</ip-accordion>
`;

  installationScript = `npm install ip-accordion`;

  custom = `ip-accordion {
  --ip-acc-primary-color: #006342;
  --ip-acc-secondary-color: #000000;
}
`;

  custom1 = `ip-accordion::part(acc-content) {
  background-color: #305b38;
}
`;

  custom2 = `ip-accordion {
  &::part(acc-content) {
    background-color: #305b38;
  }
}`;

  custom3 = `<ip-accordion>
  <div class="my-class">--content 1--</div>

  <div class="my-class">--content 2--</div>

  <div class="my-class">--content 3--</div>
</ip-accordion>`;
}
