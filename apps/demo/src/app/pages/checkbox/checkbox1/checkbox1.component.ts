import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as checkboxElements } from '@ipedis/checkbox/loader';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { Highlight } from 'ngx-highlightjs';
import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-checkbox1',
  standalone: true,
  imports: [CodeSnippetComponent, AccordionComponent, Highlight, TranslocoPipe],
  templateUrl: './checkbox1.component.html',
  styleUrl: './checkbox1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox1Component {
  private readonly translocoService = inject(TranslocoService);

  checkboxCode = `
    <ip-checkbox default-checked="true" id="check me"> Check me ! </ip-checkbox>
  `;
  import = `import '../node_modules/ip-checkbox/dist/ip-checkbox/ip-checkbox.esm';`;
  example = `
<ip-checkbox
  default-checked="true"
  disabled="true"
  id="checked"
> Checked !
</ip-checkbox>`;
  customCSS = `
  ip-checkbox {
    --primary-color: #006342;
    --secondary-color: #000000;
   }
  `;
  event = `
    const checkbox = document.querySelector('ip-checkbox');
    checkbox.addEventListener('change', event => {
      const isChecked = event.detail.checked;
      console.log(isChecked);
    });
  `;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && checkboxElements) {
      checkboxElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
