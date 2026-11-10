import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  Injector,
  afterNextRender,
  signal,
  PLATFORM_ID,
  ViewChild,
  AfterViewInit,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { DocAlertComponent } from '../doc-alert/doc-alert.component';

import { defineCustomElements as AlertElements } from '@ipedis/alert/loader';
import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { AlertElement, focusCloseButton } from '../alert-focus';

@Component({
  selector: 'app-info-alert',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocAlertComponent,
    AccordionComponent,
    TranslocoPipe,
  ],
  templateUrl: './info-alert.component.html',
  styleUrl: './info-alert.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoAlertComponent implements AfterViewInit {
  private readonly translocoService = inject(TranslocoService);

  @ViewChild('showAlertButton') showAlertButton:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('alertComponent') alertComponent:
    | ElementRef<AlertElement>
    | undefined;
  readonly isAlertVisible = signal(true);
  private readonly injector = inject(Injector);

  displayAlert() {
    this.isAlertVisible.set(true);
    // Once Angular has rendered the alert back.
    afterNextRender(
      () => focusCloseButton(this.alertComponent?.nativeElement),
      { injector: this.injector },
    );
  }
  hideAlert() {
    this.isAlertVisible.set(false);
    // Once Angular has rendered the "Show alert" button.
    afterNextRender(() => this.showAlertButton?.nativeElement.focus(), {
      injector: this.injector,
    });
  }

  ngAfterViewInit(): void {
    if (this.isAlertVisible() && this.alertComponent?.nativeElement?.shadowRoot) {
      const closeButton =
        this.alertComponent.nativeElement.shadowRoot.querySelector(
          '.close-button',
        ) as HTMLElement;
      if (closeButton) {
        closeButton.focus();
      }
    }
  }
  infoAlertCode = `
    <ip-alert
      type="info"
      alert-title="Info"
      message="System updates are complete. You may now continue working."
    >
    </ip-alert>
  `;
  cssAlertCode = `
button {
  margin-top: 20px;
  font-family: 'Mulish-light';
  font-size: 16px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background-color: #b00057;
  color: #ffffff;
  cursor: pointer;
  width: 175px;
}
ip-alert {
  --alert-font-family: 'Mulish-light';
  --alert-font-size: 18px;
}
  `;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && AlertElements) {
      AlertElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
