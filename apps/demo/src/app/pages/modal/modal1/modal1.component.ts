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

import { DocModalComponent } from '../doc-modal/doc-modal.component';
import { defineCustomElements as modalElements } from '@ipedis/modal/loader';
import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-modal1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocModalComponent,
    AccordionComponent
],
  templateUrl: './modal1.component.html',
  styleUrl: './modal1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal1Component {
  ModalCodeSnippet = `
  <ip-modal button-text="Open Custom Modal">
    <div slot="content" class="modal-content">
      <div class="dialog-title">
        <h1 id="dialog-reference">Subscribe to our Newsletter</h1>
        <p>Join thousands getting emails in their inbox.</p>
      </div>
      <div class="dialog-contents">
        <input
          type="text"
          required
          class="input-modal"
          aria-label="Your name"
          title="Your name"
          placeholder="Your Name"
          autocomplete="full-name"
        />
      </div>
      <div>
        <button class="dialog-btn">Got it, Thanks!</button>
      </div>
    </div>
  </ip-modal>
  `;
  modalCss = `
ip-modal::part(trigger-button) {
  font-family: 'Mulish-light';
}
.modal-content {
  margin: 10px 0;
  padding: 10px;

  .dialog-title {
    h1 {
      font-size: 30px;
      font-weight: 800;
      color: #2749a3;
      font-family: 'Mulish-light';
    }
    p {
      text-align: center;
      margin-top: 10px;
    }
  }
  .dialog-contents {
    margin-top: 30px;
    display: flex;
    gap: 10px;
    text-align: center;
    flex-direction: column-reverse;
    align-items: center;
    input {
      width: 467px;
      padding: 13px;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0.9);
      margin-top: 20px;
      &:focus {
        outline: 3px solid black;
        outline-offset: 3px;
      }
    }
    label {
      margin-right: 90px;
    }
  }
  .dialog-btn {
    background: #2749a3 !important;
    width: 467px;
    border-radius: 8px;
    font-family: 'Mulish-light';
    padding: 15px;
    color: white;
    border: none;
    margin-top: 20px;
  }

  .dialog-btn:focus {
    outline: 3px solid black;
    outline-offset: 3px;
  }
}
  `;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && modalElements) {
      modalElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
