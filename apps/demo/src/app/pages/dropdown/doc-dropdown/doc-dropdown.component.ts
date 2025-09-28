import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-dropdown',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-dropdown.component.html',
  styleUrl: './doc-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocDropdownComponent {
  import = `import '../node_modules/ip-dropdown/dist/ip-dropdown/ip-dropdown.esm';`;

  customCSS = `
  ip-dropdown {
    --primary-color: #006342;
    --color-hover: #000000;
    --font-color: #333333;
    --selected-bg-color: #f0f0f0;
    --font-size: 14px;
  }
  `;
  event = `
   const dropdown = document.querySelector("ip-dropdown");   
      dropdown.addEventListener("itemSelected", (event) => {
      const selectedItem = event.detail;
      console.log("Item selected:", selectedItem);
      });
  `;
}
