import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-search-bar',
  standalone: true,
  imports: [Highlight, TranslocoPipe],
  templateUrl: './doc-search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './doc-search-bar.component.scss',
})
export class DocSearchBarComponent {
  private readonly translocoService = inject(TranslocoService);

  import = `import '../node_modules/ip-search-bar/dist/ip-search-bar/ip-search-bar.esm';`;

  example = `<ip-search-bar
  placeholder="Please enter a keyword !"
  suggestions-data='["Avocat ", "Amande", "Abricot", "Ananas"]'
>
</ip-search-bar>`;

  custom1 = `ip-search-bar {
  --text-btn-color: #006342;
  --font-size: 15px;
}`;
  event = `const searchBar = document.querySelector('ip-search-bar');

searchBar.addEventListener('buttonClicked', (event) => {
  console.log('Search button clicked!');
});`;
}
