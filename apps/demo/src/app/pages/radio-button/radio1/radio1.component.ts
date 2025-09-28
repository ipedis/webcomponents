import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as radioElements } from '@ipedis/radio/loader';
import { DocRadioComponent } from '../doc-radio/doc-radio.component';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { RouterLink } from '@angular/router';

import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-radio1-button',
  standalone: true,
  imports: [
    DocRadioComponent,
    CodeSnippetComponent,
    RouterLink,
    AccordionComponent
],
  templateUrl: './radio1.component.html',
  styleUrl: './radio1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Radio1ButtonComponent {
  radioCode = `
  <div class="radio-wrapper">
    <ip-radio
      id="radio"
      legend="What is your gender"
      default-option-id="Female"
      options='[
          {"id": "Male", "label": "Male"}, 
          {"id": "Female", "label": "Female"},
          {"id": "Other", "label": "Other", "disabled": true}   
          ]'
    ></ip-radio>
  </div>
  `;

  switcherTitle = 'Radio Button 1';
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && radioElements) {
      radioElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
