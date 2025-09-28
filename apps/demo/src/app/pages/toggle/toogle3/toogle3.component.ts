import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as toggleElements } from '@ipedis/toggle/loader';
import { DocToogleComponent } from '../doc-toogle/doc-toogle.component';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';

import { RouterLink } from '@angular/router';
import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-toogle3',
  standalone: true,
  imports: [
    DocToogleComponent,
    CodeSnippetComponent,
    RouterLink,
    AccordionComponent
],
  templateUrl: './toogle3.component.html',
  styleUrl: './toogle3.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toogle3Component {
  toggleWithIndicCode = `
    <ip-toggle size="small">
      <label class="switch-label" slot="switch-label"
        >Activate strong authentication</label
      >
    </ip-toggle>
  `;

  switcherTitle = 'Toggle 3';

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && toggleElements) {
      toggleElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
