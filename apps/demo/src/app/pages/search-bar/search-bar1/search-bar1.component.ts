import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';

import { DocSearchBarComponent } from '../doc-search-bar/doc-search-bar.component';
import { defineCustomElements as SearchBarElements } from '@ipedis/combobox/loader';
import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-search-bar1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocSearchBarComponent,
    AccordionComponent
],
  templateUrl: './search-bar1.component.html',
  styleUrl: './search-bar1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchBar1Component {
  switcherTitle = 'Search-bar 1';

  searchCode = `   
      <ip-search-bar
        placeholder="Please enter a keyword !"
        suggestions-data='[
          "Accessibility Web ",
          "Accessibility Website",
          "Accessibility assistive technologies",
          "Accessibility ressources",
          "Accessibility barrier-free solutions",
          "Accessibility Web content guidelines"
          ]'
      >
      </ip-search-bar>
  `;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && SearchBarElements) {
      SearchBarElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
