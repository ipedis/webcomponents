import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { DocBreadcrumbComponent } from '../doc-breadcrumb/doc-breadcrumb.component';
import { defineCustomElements as breadcrumbElements } from '@ipedis/breadcrumb/loader';

@Component({
  selector: 'app-breadcrumb1',
  standalone: true,
  imports: [
    AccordionComponent,
    CodeSnippetComponent,
    DocBreadcrumbComponent
],
  templateUrl: './breadcrumb1.component.html',
  styleUrl: './breadcrumb1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Breadcrumb1Component {
  codeSnippet = `<ip-breadcrumb
  breadcrumb-title="LIST OF COMPONENTS"
  breadcrumb-items='[
        {"label": "Home", "link": "/"},
        {"label": "Accessibility", "link": "/Accessibility"},
        {"label": "List of components"}
      ]'
  prefix-aria-label="Link to"
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
