import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as stepperElements } from '@ipedis/stepper/loader';
import { DocStepperComponent } from '../doc-stepper/doc-stepper.component';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-stepper1',
  standalone: true,
  imports: [
    DocStepperComponent,
    CodeSnippetComponent,
    AccordionComponent
],
  templateUrl: './stepper1.component.html',
  styleUrl: './stepper1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Stepper1Component {
  stepperHtml = `
  <ip-stepper steps="4">
  <div slot="step1">
    <h2>Please select your plan</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
      cupiditate nihil quae pariatur, beatae eum voluptas optio quia dolorum
      fuga amet voluptate veniam nulla asperiores vitae esse id tempora
      consequuntur! Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Laudantium alias quisquam eum, libero labore odit, quas adipisci optio
      dolorem molestiae quam. Placeat dolore neque officia facere quam quos cum
      officiis.
    </p>
  </div>
  <div slot="step2">
    <h2>Create your contact details</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa enim
      aspernatur iste, ducimus hic quisquam, tenetur accusantium beatae
      doloremque voluptatem, odit debitis! Corrupti placeat, alias voluptatibus
      commodi quis culpa doloribus. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Harum nemo est numquam asperiores assumenda eligendi
      iste cupiditate vel sunt excepturi vitae temporibus at, eius, quis ratione
      id voluptas veritatis adipisci.
    </p>
  </div>
  <div slot="step3">
    <h2>Create your password</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid enim
      dignissimos modi fugiat sint iste fugit quas eum autem excepturi atque
      nam, dolore a, earum veniam nobis neque pariatur cupiditate. Lorem ipsum
      dolor sit, amet consectetur adipisicing elit. Dicta rerum esse magni,
      sapiente, omnis voluptate quia sed neque quae sit maiores ab, iure ipsam
      excepturi dolores corporis perferendis nostrum est?
    </p>
  </div>
  <div slot="step4">
    <h2>Payment and deliveery details</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
      cupiditate nihil quae pariatur, beatae eum voluptas optio quia dolorum
      fuga amet voluptate veniam nulla asperiores vitae esse id tempora
      consequuntur! Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Laudantium alias quisquam eum, libero labore odit, quas adipisci optio
      dolorem molestiae quam. Placeat dolore neque officia facere quam quos cum
      officiis.
    </p>
  </div>
</ip-stepper>
  `;
  stepperCss = `  h2 {
    font-family: 'Mulish-Bold';
  }
  p {
    font-size: 16px;
    margin-bottom: 20px;
    font-family: 'Mulish-Light';
  }`;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && stepperElements)
      stepperElements(inject(DOCUMENT).defaultView as Window);
  }
}
