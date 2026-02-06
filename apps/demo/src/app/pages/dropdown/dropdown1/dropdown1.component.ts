import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as dropdownElements } from '@ipedis/dropdown/loader';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { DocDropdownComponent } from '../doc-dropdown/doc-dropdown.component';

import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-dropdown1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocDropdownComponent,
    AccordionComponent
],
  templateUrl: './dropdown1.component.html',
  styleUrl: './dropdown1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown1Component {
  codeSnippet = `
  <ip-dropdown
    dropdown-title="Country"
    placeholder="Select a country:"
    items-options='["Mauritius", "France", "Germany", "Zimbabwe"]'
  >
  </ip-dropdown>
  `;

  dropdown1Css = `
  ip-dropdown {
   --primary-color: #b00057;
   --font-color: #000000;
   --font-family: 'Mulish-light';
  }
  `;

  switcherTitle = 'Dropdown 1';

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && dropdownElements) {
      dropdownElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
