import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-stepper',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-stepper.component.html',
  styleUrl: './doc-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocStepperComponent {
  installationScript = `npm install ip-stepper`;
  import = `import '../node_modules/ip-stepper/dist/ip-stepper/ip-stepper.esm';`;
  example = `<ip-stepper
steps="3"
back-btn-text="Previous"
continue-btn-text="Next"
finish-btn-text="Complete"
back-btn-aria-label="Go back to the previous step"
continue-btn-aria-label="Continue to the next step"
finish-btn-aria-label="Complete the process"
indicator-text="Step"
onFinishButtonClick={() => alert('Finish button clicked!')}

>

  <div slot="step1">Step 1 Content</div>
  <div slot="step2">Step 2 Content</div>
  <div slot="step3">Step 3 Content</div>
</ip-stepper>`;
  custom = `ip-stepper {
  --primary-color: #006342;
  --indicator-text-color: #000000;
}
`;
  event = `document
  .querySelector('ip-stepper')
  .addEventListener('finishButtonClick', () => {
    console.log('Finish button clicked!');
  });`;
}
