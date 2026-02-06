import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-tooltip',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-tooltip.component.html',
  styleUrl: './doc-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTooltipComponent {
  installationScript = `npm install ip-tooltip`;
  import = `import '../node_modules/ip-tooltip/dist/ip-tooltip/ip-tooltip.esm';`;
  example = `<ip-tooltip
  tooltip-title="Tooltip Title"
  tooltip-content="The text in the tooltip"
  tooltip-trigger="Click me!"
  tooltip-btn-1="Don't show again"
  btn-1-aria-label="Don't show again"
  tooltip-btn-2="Learn More"
  btn-2-aria-label="Learn More"
  tooltip-btn-close="true"
>
</ip-tooltip>`;
  custom = `ip-tooltip {
  --primary-color: #006342;
  --secondary-color: #000000;
}

ip-tooltip::part(tooltip-trigger) {
  width: 250px;
  height: 35px;
}
`;

  eventHandlingExample = `document.addEventListener('DOMContentLoaded', function () {
  const tooltip = document.querySelector('#clicked-tooltip');
  tooltip.addEventListener('btn1Click', function () {
    console.log('Event btn1Click captured from index.html');
  });
  tooltip.addEventListener('btn2Click', function () {
    console.log('Event btn2Click captured from index.html');
  });
  document.querySelector('#btn1').addEventListener('click', function () {
    const event = new CustomEvent('btn1Click');
    tooltip.dispatchEvent(event);
  });
  document.querySelector('#btn2').addEventListener('click', function () {
    const event = new CustomEvent('btn2Click');
    tooltip.dispatchEvent(event);
  });
});
`;
}
