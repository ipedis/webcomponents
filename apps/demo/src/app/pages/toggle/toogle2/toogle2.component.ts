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
  selector: 'app-toogle2',
  standalone: true,
  imports: [
    DocToogleComponent,
    CodeSnippetComponent,
    RouterLink,
    AccordionComponent
],
  templateUrl: './toogle2.component.html',
  styleUrl: './toogle2.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toogle2Component {
  toggleWithTextCode = `
  <div class="toggle">
    <ip-toggle
      active-label="ON"
      inactive-label="OFF"
      aria-label="Toggle notifications on or off"
      size="small"
      checked="true"
    >
    </ip-toggle>

    <ip-toggle
      active-label="ON"
      inactive-label="OFF"
      aria-label="Toggle notifications on or off"
      checked="false"
    >
    </ip-toggle>
  </div>
  `;

  switcherTitle = 'Toggle 2';

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && toggleElements) {
      toggleElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
