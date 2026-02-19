import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-doc-radio',
  standalone: true,
  imports: [CommonModule, Highlight, TranslocoPipe],
  templateUrl: './doc-radio.component.html',
  styleUrl: './doc-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocRadioComponent {
  private readonly translocoService = inject(TranslocoService);

  import = `import '../node_modules/ip-radio/dist/ip-radio/ip-radio.esm';
`;
  example = `
<ip-radio
  label-position="before"
  default-option-id="3"
  options='[
    {"id": "1", "label": "Option 1", "disabled": true},
    {"id": "2", "label": "Option 2"}, 
    {"id": "3", "label": "Option 3"}
  ]'
>
</ip-radio>
`;
  customCSS = `
ip-radio {
  --primary-color: #006342;
  --secondary-color: #000000;
  --radio-size: 18px;
  --fieldset-border: 2px solid #d6254f;
}
  `;
  event = `
const radio = document.querySelector('ip-radio');
radio.addEventListener('selectionChanged', (event) => {
console.log('selectionChanged', event.detail);
});
  `;
}
