import { Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-alert',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-alert.component.html',
  styleUrl: './doc-alert.component.scss',
})
export class DocAlertComponent {
  example = `<ip-alert
  message="Your message has been sent successfully"
  type="success"
  alert-title="Success"
>
</ip-alert>
`;
  custom1 = `ip-alert {
  --alert-font-family: 'Mulish-regular Sans';
  --alert-font-title-size: 16px;
  }`;
  import = `import '../node_modules/ip-alert/dist/ip-alert/ip-alert.esm';
`;
}
