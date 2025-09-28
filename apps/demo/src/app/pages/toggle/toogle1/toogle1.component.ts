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
  selector: 'app-toogle1',
  standalone: true,
  imports: [
    DocToogleComponent,
    CodeSnippetComponent,
    RouterLink,
    AccordionComponent
],
  templateUrl: './toogle1.component.html',
  styleUrl: './toogle1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toogle1Component {
  toggleCode = `
  <div class="toggle">
    <ip-toggle aria-label="Toggle notifications on or off" checked="true">
    </ip-toggle>

    <ip-toggle
      aria-label="Toggle notifications on or off"
      size="large"
      checked="false"
    >
    </ip-toggle>
  </div>
  `;

  switcherTitle = 'Toggle 1';

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && toggleElements) {
      toggleElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
