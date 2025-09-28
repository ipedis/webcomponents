import { Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-menu',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-menu.component.html',
  styleUrl: './doc-menu.component.scss',
})
export class DocMenuComponent {
  installationScript = `install ip-burger-menu`;
  example = `<ip-burger-menu
  open-menu-aria-label="Ouvrir le menu"
  close-menu-aria-label="Fermer le menu"
  path-to-close-icon="../../assets/images/x-icon.svg"
  path-to-open-icon="../../assets/images/icon-list.svg"
  path-to-arrow-right-icon="../../assets/images/arrow-right.svg"
  menu-data='[
      {"label":"Home", "href":"/home"},
      {"label":"About", "href":"/about"},
      {"label":"Services", "href":"/services"},
      {"label":"Contact", "href":"/contact", "disabled": true}
    ]'
>
  <div slot="left-head-content">
    <img src="../../assets/images/logo.png" alt="" />
  </div>
  <div slot="before-toggle-menu-content">
    <button>Votre pays</button>
    <button>Contactez-nous</button>
  </div>
  <div slot="left-menu-content">
    <img src="../../assets/images/image1.png" alt="" />
  </div>
</ip-burger-menu>`;
  css = `ip-burger-menu::part(nav-bar) {
  background-color: #333;
}

ip-burger-menu {
  --primary-color: #226f54;
  --secondary-color: #fff;
  --bg-nav-open-menu: #0000;
}`;
  import = `
import '../node_modules/ip-burger-menu/dist/ip-burger-menu/ip-burger-menu.esm';
  `;
}
