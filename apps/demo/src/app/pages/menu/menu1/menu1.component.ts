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
import { DocMenuComponent } from '../doc-menu/doc-menu.component';
import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { defineCustomElements as menuElements } from '@ipedis/menu/loader';

@Component({
  selector: 'app-menu1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocMenuComponent,
    AccordionComponent
],
  templateUrl: './menu1.component.html',
  styleUrl: './menu1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Menu1Component {
  codeSnippet = `<ip-burger-menu
  menu-data='[
      {"label": "Home", "href": "#home"},
      {"label": "Discover our team", "href": "#about"},
      {"label": "Our partners", "href": "#partners"},
      {"label": "Ultimate Solution", "href": "#Solution"},
      {"label": "Our Donate Now", "href": "#Donate"},
      {"label": "Join our community", "href": "#community"},
      {"label": "FAQ", "href": "#faq"},
      {"label": "Our publications", "href": "#publications", "disabled": true}
    ]'
>
  <div slot="left-head-content" class="logo-wrapper">
    <img src="./assets/images/Frame.png" alt="Logo" />
    <label class="logo-text" for="">Kestrel</label>
  </div>
  <div slot="before-toggle-menu-content">
    <button class="contact-us-btn" aria-label="Contact us">
      <label for=""> Contact us </label>
      <img src="./assets/images/paper-pale-right.svg" alt="" />
    </button>
  </div>
  <div slot="left-menu-content" class="left-menu-content">
 
    <div class="content" tabindex="0">
      <img src="./assets/images/image2.png" alt="" />
      <label for="">Who are we ?</label>
    </div>

  </div>
</ip-burger-menu>`;
  css = `
  ip-burger-menu::part(menu-list) {
  column-count: 3;
  column-gap: 20px;
  gap: 50px;
}

.head {
  margin: 0;
  padding: 0;
}
.contact-us-btn {
  display: inline-flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 50px;
  border: 1px #fff solid;
  background-color: transparent;
  color: #fff;

  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.9px;
}
.contact-us-btn:focus,
.contact-us-btn:hover {
  background-color: #226f54;
  outline: 3px solid #fff;
}
.logo-wrapper {
  gap: 20px;
  display: flex;
  width: 231px;
  height: 71px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.logo-text {
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'La Belle Aurore';
  font-size: 55px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px;
  letter-spacing: 2.75px;
  text-transform: capitalize;
}
.left-menu-content {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 0 20px;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #fff;
  width: 300px;
  height: 325px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #226f54;
}
.content label {
  color: #fff;
  text-align: center;
  font-family: Lato;
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  width: 239.978px;
  height: 98px;
  flex-direction: column;
  justify-content: center;
}
`;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && menuElements) {
      menuElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
