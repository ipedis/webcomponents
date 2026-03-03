import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as paginationElements } from '@ipedis/pagination/loader';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { DocPaginationComponent } from '../doc-pagination/doc-pagination.component';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-pagination1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocPaginationComponent,
    AccordionComponent,
    TranslocoPipe,
  ],
  templateUrl: './pagination1.component.html',
  styleUrl: './pagination1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination1Component {
  private readonly translocoService = inject(TranslocoService);

  codeSnippet = `
    <ip-pagination
      total-pages="25"
      current-page="5"
      visible-pages="7"
    >
    </ip-pagination>
  `;

  switcherTitle = 'Pagination 1';
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && paginationElements) {
      paginationElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
