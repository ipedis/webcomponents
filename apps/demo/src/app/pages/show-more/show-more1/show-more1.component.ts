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
import { RouterLink } from '@angular/router';

import { defineCustomElements as showMoreElements } from '@ipedis/show-more/loader';
import { DocShowMoreComponent } from '../doc-show-more/doc-show-more.component';
import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { CardComponent } from '../../../features/card/card.component';

@Component({
  selector: 'app-show-more1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    RouterLink,
    DocShowMoreComponent,
    AccordionComponent,
    CardComponent
],
  templateUrl: './show-more1.component.html',
  styleUrl: './show-more1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMore1Component {
  showMoreCode = `
    <ip-show-more
      show-less-text="Voir moins"
      show-more-text="Voir plus"
    >
        <div slot="content" class="show-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          blanditiis itaque deserunt ab ad eum, voluptas animi non quos esse
          modi voluptate nemo temporibus? Voluptates excepturi asperiores
          autem quisquam provident!
        </div>
    </ip-show-more>
  `;
  smCss = `
   .show-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 40px;
    padding-bottom: 25px;
  }

  ip-show-more {
    --ip-font-family: 'Mulish-light';
  }
  `;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && showMoreElements) {
      showMoreElements(inject(DOCUMENT).defaultView as Window);
    }
  }

  moreCards = [
    {
      title: "Nature's Symphony",
      imageUrl: 'assets/images/eg-sm/Image=04.png',
    },
    {
      title: 'Skybound Serently',
      imageUrl: 'assets/images/eg-sm/Image=05.png',
    },
    {
      title: 'Infinite Horizons',
      imageUrl: 'assets/images/eg-sm/Image=06.jpg',
    },
  ];
}
