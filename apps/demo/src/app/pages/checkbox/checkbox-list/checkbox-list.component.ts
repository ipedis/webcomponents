import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as checkboxElements } from '@ipedis/checkbox/loader';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';

import { RouterLink } from '@angular/router';
import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-checkbox-list',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    RouterLink,
    AccordionComponent,
    Highlight
],
  templateUrl: './checkbox-list.component.html',
  styleUrl: './checkbox-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListComponent {
  checkboxListCode = `
    <ip-checkbox-list
      legend="Select the options below:"
      options='[
          {"id": "agree", "label": "I agree to the terms and conditions.",
          "defaultChecked": true , "disabled": true},
          {"id": "remember", "label": "Remember me on this device", "disabled": true}, 
          {"id": "newsletter", "label": "subscribe to our newsletter for updates.",
          "defaultChecked": true},
          {"id": "send", "label": "Send me promotional offers and discounts."},
          {"id": "participate", "label": "Participate in our user feddback program."}
          ]'
    >
    </ip-checkbox-list>
  `;

  import = `import '../node_modules/ip-checkbox-list/dist/ip-checkbox-list/ip-checkbox-list.esm';`;
  example = `
<ip-checkbox-list
 options='[
  {"id": "option1", "label": "Option 1"},
  {"id": "option2", "label": "Option 2"}]'
>
</ip-checkbox-list>`;
  customCSS = `
  ip-checkbox-list {
    --primary-color: #006342;
    --secondary-color: #000000;
  }
  `;
  event = `
    const checkboxList = document.querySelector('ip-checkbox-list');            
      checkboxList.addEventListener('change', event => {
      console.log(event.detail);
    });
  `;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && checkboxElements) {
      checkboxElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
