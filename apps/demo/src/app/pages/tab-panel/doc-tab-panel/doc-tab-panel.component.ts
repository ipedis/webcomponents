import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-tab-panel',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-tab-panel.component.html',
  styleUrl: './doc-tab-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTabPanelComponent {
  installationScript = `npm install ip-tab-panel`;
  import = `import '../node_modules/ip-tab-panel/dist/ip-tab-panel/ip-tab-panel.esm';`;
  example = `<ip-tab-panel
  selected-tab="tab-content-2"
  title-tag="h3"
  tab-panel-title="Audit RGAA"
  tab-panel-headers='[
        {"title":"Accessibilité", "imgPath": "assets/images/acc-1.svg",
         "imgPathActive": "assets/images/acc-1-active.svg"},
        {"title":"Pdf Document", "imgPath":"assets/images/acc-2.svg",
         "imgPathActive": "assets/images/acc-2-active.svg"},
        {"title":"Statistical", "imgPath":"assets/images/acc-3.svg",
         "imgPathActive": "assets/images/acc-3-active.svg"},
        {"title":"Certification", "imgPath":"assets/images/acc-4.svg",
         "imgPathActive": "assets/images/acc-4-active.svg"},
        {"title":"Legislation", "imgPath":"assets/images/acc-5.svg",
         "imgPathActive": "assets/images/acc-5-active.svg"}
      ]'
>
  <div slot="tab-content-1">--content of Accessibilité--</div>
  <div slot="tab-content-2">--content of Pdf Document--</div>
  <div slot="tab-content-3">--content of Statistical--</div>
  <div slot="tab-content-4">--content of Certification--</div>
  <div slot="tab-content-5">--content of Legislation--</div>
</ip-tab-panel>`;

  custom1 = `ip-tab-panel {
  --ip-tab-primary-color: #006342;
  --ip-tab-secondary-color: #000000;
}
`;

  custom2 = `ip-tab-panel::part(tab-btn) {
  background-color: #305b38;
}
`;
  custom3 = `
ip-tab-panel {
  &::part(tab-btn) {
    background-color: #305b38;
  }
}
`;

  example2 = `
<ip-tab-panel>
  <div class="my-class">--content 1--</div>
  <div class="my-class">--content 2--</div>
  <div class="my-class">--content 3--</div>
</ip-tab-panel>`;
}
