import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { DocBreadcrumbComponent } from '../doc-breadcrumb/doc-breadcrumb.component';
import { defineCustomElements as breadcrumbElements } from '@ipedis/breadcrumb/loader';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-breadcrumb1',
  standalone: true,
  imports: [
    AccordionComponent,
    CodeSnippetComponent,
    DocBreadcrumbComponent,
    TranslocoPipe,
  ],
  templateUrl: './breadcrumb1.component.html',
  styleUrl: './breadcrumb1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Breadcrumb1Component {
  private readonly translocoService = inject(TranslocoService);

  codeSnippet = `<ip-breadcrumb
    breadcrumb-title="Démo Fil d'ariane"
    breadcrumb-items='[
      {"label": "Composants Web", "link": "https://design.ipedis.com/composants-web/"},
      {"label": "Fil d&apos;ariane", "link": "https://design.ipedis.com/composants-web/fil-dariane/"},
      {"label": "Démo"}
    ]'
    prefix-aria-label="Lien vers"
      >
</ip-breadcrumb>
  `;
  css = `ip-breadcrumb {
  &::part(title) {
    font-family: 'Mulish-bold';
    font-size: 32px;
  }
  &::part(breadcrumb) {
    font-family: 'Mulish-light';
  }
}`;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && breadcrumbElements) {
      breadcrumbElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
