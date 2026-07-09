import { Route } from '@angular/router';
import { langGuard } from './core/guards/lang.guard';

const childRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/external-redirect/external-redirect.component').then(
        (m) => m.ExternalRedirectComponent,
      ),
  },
  // Tooltip
  {
    path: 'tooltip',
    loadChildren: () =>
      import('./pages/tooltip/tooltip.routing').then((m) => m.tooltipRoutes),
    data: {
      title: 'pages.tooltip.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/infobulle/',
        en: 'https://design.ipedis.com/en/web-components/tooltip/',
      },
    },
  },
  {
    path: 'clickable-tooltip',
    loadComponent: () =>
      import('./pages/tooltip/tooltip1/tooltip1.component').then(
        (m) => m.Tooltip1Component,
      ),
    data: {
      title: 'pages.tooltip.click.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/infobulle/',
        en: 'https://design.ipedis.com/en/web-components/tooltip/',
      },
    },
  },
  {
    path: 'hover-tooltip',
    loadComponent: () =>
      import('./pages/tooltip/tooltip2/tooltip2.component').then(
        (m) => m.Tooltip2Component,
      ),
    data: {
      title: 'pages.tooltip.hover.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/infobulle/',
        en: 'https://design.ipedis.com/en/web-components/tooltip/',
      },
    },
  },
  {
    path: 'infobulle',
    loadComponent: () =>
      import('./pages/tooltip/tooltip1/tooltip1.component').then(
        (m) => m.Tooltip1Component,
      ),
    data: {
      title: 'pages.tooltip.click.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/infobulle/',
        en: 'https://design.ipedis.com/en/web-components/tooltip/',
      },
    },
  },
  {
    path: 'infobulle-survol',
    loadComponent: () =>
      import('./pages/tooltip/tooltip2/tooltip2.component').then(
        (m) => m.Tooltip2Component,
      ),
    data: {
      title: 'pages.tooltip.hover.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/infobulle/',
        en: 'https://design.ipedis.com/en/web-components/tooltip/',
      },
    },
  },
  // Dropdown
  {
    path: 'dropdown',
    loadChildren: () =>
      import('./pages/dropdown/dropdown.routing').then((m) => m.dropdownRoutes),
    data: {
      title: 'pages.dropdown.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/',
        en: 'https://design.ipedis.com/en/web-components/',
      },
    },
  },
  // Toggle
  {
    path: 'toggle',
    loadChildren: () =>
      import('./pages/toggle/toggle.routing').then((m) => m.toggleRoues),
    data: {
      title: 'pages.toggle.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bascule/',
        en: 'https://design.ipedis.com/en/web-components/toggle/',
      },
    },
  },
  {
    path: 'simple-toggle',
    loadComponent: () =>
      import('./pages/toggle/toogle1/toogle1.component').then(
        (m) => m.Toogle1Component,
      ),
    data: {
      title: 'pages.toggle.simple.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bascule/',
        en: 'https://design.ipedis.com/en/web-components/toggle/',
      },
    },
  },
  {
    path: 'toggle-text',
    loadComponent: () =>
      import('./pages/toggle/toogle2/toogle2.component').then(
        (m) => m.Toogle2Component,
      ),
    data: {
      title: 'pages.toggle.with-text.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bascule/',
        en: 'https://design.ipedis.com/en/web-components/toggle/',
      },
    },
  },
  {
    path: 'toggle-indication',
    loadComponent: () =>
      import('./pages/toggle/toogle3/toogle3.component').then(
        (m) => m.Toogle3Component,
      ),
    data: {
      title: 'pages.toggle.with-indication.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bascule/',
        en: 'https://design.ipedis.com/en/web-components/toggle/',
      },
    },
  },
  {
    path: 'bascule',
    loadComponent: () =>
      import('./pages/toggle/toogle1/toogle1.component').then(
        (m) => m.Toogle1Component,
      ),
    data: {
      title: 'pages.toggle.simple.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bascule/',
        en: 'https://design.ipedis.com/en/web-components/toggle/',
      },
    },
  },
  {
    path: 'bascule-texte',
    loadComponent: () =>
      import('./pages/toggle/toogle2/toogle2.component').then(
        (m) => m.Toogle2Component,
      ),
    data: {
      title: 'pages.toggle.with-text.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bascule/',
        en: 'https://design.ipedis.com/en/web-components/toggle/',
      },
    },
  },
  {
    path: 'bascule-indication',
    loadComponent: () =>
      import('./pages/toggle/toogle3/toogle3.component').then(
        (m) => m.Toogle3Component,
      ),
    data: {
      title: 'pages.toggle.with-indication.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bascule/',
        en: 'https://design.ipedis.com/en/web-components/toggle/',
      },
    },
  },
  // Radio button
  {
    path: 'radio-button',
    loadChildren: () =>
      import('./pages/radio-button/radio-button.routing').then(
        (m) => m.radioButtonRoutes,
      ),
    data: {
      title: 'pages.radio-button.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bouton-radio/',
        en: 'https://design.ipedis.com/en/web-components/radio-button/',
      },
    },
  },
  {
    path: 'bouton-radio',
    loadChildren: () =>
      import('./pages/radio-button/radio-button.routing').then(
        (m) => m.radioButtonRoutes,
      ),
    data: {
      title: 'pages.radio-button.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/bouton-radio/',
        en: 'https://design.ipedis.com/en/web-components/radio-button/',
      },
    },
  },
  // Checkbox
  {
    path: 'checkbox',
    loadChildren: () =>
      import('./pages/checkbox/checkbox.routing').then((m) => m.checkboxRoutes),
    data: {
      title: 'pages.checkbox.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/case-a-cocher/',
        en: 'https://design.ipedis.com/en/web-components/checkbox/',
      },
    },
  },
  {
    path: 'simple-checkbox',
    loadComponent: () =>
      import('./pages/checkbox/checkbox1/checkbox1.component').then(
        (m) => m.Checkbox1Component,
      ),
    data: {
      title: 'pages.checkbox.simple.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/case-a-cocher/',
        en: 'https://design.ipedis.com/en/web-components/checkbox/',
      },
    },
  },
  {
    path: 'checkbox-list',
    loadComponent: () =>
      import('./pages/checkbox/checkbox-list/checkbox-list.component').then(
        (m) => m.CheckboxListComponent,
      ),
    data: {
      title: 'pages.checkbox.list.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/case-a-cocher/',
        en: 'https://design.ipedis.com/en/web-components/checkbox/',
      },
    },
  },
  {
    path: 'case-a-cocher',
    loadComponent: () =>
      import('./pages/checkbox/checkbox1/checkbox1.component').then(
        (m) => m.Checkbox1Component,
      ),
    data: {
      title: 'pages.checkbox.simple.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/case-a-cocher/',
        en: 'https://design.ipedis.com/en/web-components/checkbox/',
      },
    },
  },
  {
    path: 'case-a-cocher-liste',
    loadComponent: () =>
      import('./pages/checkbox/checkbox-list/checkbox-list.component').then(
        (m) => m.CheckboxListComponent,
      ),
    data: {
      title: 'pages.checkbox.list.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/case-a-cocher/',
        en: 'https://design.ipedis.com/en/web-components/checkbox/',
      },
    },
  },
  // Login
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.routing').then((m) => m.loginRoutes),
    data: {
      title: 'pages.login.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/champ-de-mot-de-passe/',
        en: 'https://design.ipedis.com/en/web-components/password-input/',
      },
    },
  },
  {
    path: 'login-email',
    loadComponent: () =>
      import('./pages/login/login1/login1.component').then(
        (m) => m.Login1Component,
      ),
    data: {
      title: 'pages.login.email.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/champ-de-mot-de-passe/',
        en: 'https://design.ipedis.com/en/web-components/password-input/',
      },
    },
  },
  {
    path: 'login-username',
    loadComponent: () =>
      import('./pages/login/login2/login2.component').then(
        (m) => m.Login2Component,
      ),
    data: {
      title: 'pages.login.username.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/champ-de-mot-de-passe/',
        en: 'https://design.ipedis.com/en/web-components/password-input/',
      },
    },
  },
  {
    path: 'champ-de-mot-de-passe',
    loadComponent: () =>
      import('./pages/login/login1/login1.component').then(
        (m) => m.Login1Component,
      ),
    data: {
      title: 'pages.login.email.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/champ-de-mot-de-passe/',
        en: 'https://design.ipedis.com/en/web-components/password-input/',
      },
    },
  },
  {
    path: 'champ-de-mot-de-passe-nom',
    loadComponent: () =>
      import('./pages/login/login2/login2.component').then(
        (m) => m.Login2Component,
      ),
    data: {
      title: 'pages.login.username.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/champ-de-mot-de-passe/',
        en: 'https://design.ipedis.com/en/web-components/password-input/',
      },
    },
  },
  // Pagination
  {
    path: 'pagination',
    loadChildren: () =>
      import('./pages/pagination/pagination.routing').then(
        (m) => m.paginationRoutes,
      ),
    data: {
      title: 'pages.pagination.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/pagination/',
        en: 'https://design.ipedis.com/en/web-components/pagination/',
      },
    },
  },
  // Table
  {
    path: 'table',
    loadChildren: () =>
      import('./pages/table/table.routing').then((m) => m.tableRoutes),
    data: {
      title: 'pages.table.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/tableaux/',
        en: 'https://design.ipedis.com/en/web-components/tables/',
      },
    },
  },
  {
    path: 'tableaux',
    loadChildren: () =>
      import('./pages/table/table.routing').then((m) => m.tableRoutes),
    data: {
      title: 'pages.table.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/tableaux/',
        en: 'https://design.ipedis.com/en/web-components/tables/',
      },
    },
  },
  // Tab panel
  {
    path: 'tab-panel',
    loadChildren: () =>
      import('./pages/tab-panel/tab-panel.routing').then(
        (m) => m.tabPanelRoutes,
      ),
    data: {
      title: 'pages.tab-panel.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/panneau-donglet/',
        en: 'https://design.ipedis.com/en/web-components/tab-panel/',
      },
    },
  },
  {
    path: 'panneau-donglet',
    loadChildren: () =>
      import('./pages/tab-panel/tab-panel.routing').then(
        (m) => m.tabPanelRoutes,
      ),
    data: {
      title: 'pages.tab-panel.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/panneau-donglet/',
        en: 'https://design.ipedis.com/en/web-components/tab-panel/',
      },
    },
  },
  // Accordion
  {
    path: 'accordion',
    loadChildren: () =>
      import('./pages/accordion/accordion.routing').then(
        (m) => m.accordionRoutes,
      ),
    data: {
      title: 'pages.accordion.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/accordeon/',
        en: 'https://design.ipedis.com/en/web-components/accordion/',
      },
    },
  },
  {
    path: 'accordeon',
    loadChildren: () =>
      import('./pages/accordion/accordion.routing').then(
        (m) => m.accordionRoutes,
      ),
    data: {
      title: 'pages.accordion.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/accordeon/',
        en: 'https://design.ipedis.com/en/web-components/accordion/',
      },
    },
  },
  // Modal
  {
    path: 'modal',
    loadChildren: () =>
      import('./pages/modal/modal.routing').then((m) => m.modalRoutes),
    data: {
      title: 'pages.modal.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/fenetre-modale/',
        en: 'https://design.ipedis.com/en/web-components/modal-window/',
      },
    },
  },
  {
    path: 'fenetre-modale',
    loadChildren: () =>
      import('./pages/modal/modal.routing').then((m) => m.modalRoutes),
    data: {
      title: 'pages.modal.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/fenetre-modale/',
        en: 'https://design.ipedis.com/en/web-components/modal-window/',
      },
    },
  },
  // Footnote
  {
    path: 'footnote',
    loadChildren: () =>
      import('./pages/footnote/footnote.routing').then((m) => m.footnoteRoutes),
    data: {
      title: 'pages.footnote.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/',
        en: 'https://design.ipedis.com/en/web-components/',
      },
    },
  },
  // Show more
  {
    path: 'show-more',
    loadChildren: () =>
      import('./pages/show-more/show-more.routing').then(
        (m) => m.showMoreRoutes,
      ),
    data: {
      title: 'pages.show-more.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/',
        en: 'https://design.ipedis.com/en/web-components/',
      },
    },
  },
  // Alert
  {
    path: 'alert',
    loadChildren: () =>
      import('./pages/alert/alert.routing').then((m) => m.alertRouting),
    data: {
      title: 'pages.alert.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/',
        en: 'https://design.ipedis.com/en/web-components/',
      },
    },
  },
  // Search bar
  {
    path: 'search-bar',
    loadChildren: () =>
      import('./pages/search-bar/search-bar.routing').then(
        (m) => m.searchBarRouting,
      ),
    data: {
      title: 'pages.search-bar.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/',
        en: 'https://design.ipedis.com/en/web-components/',
      },
    },
  },
  // Breadcrumb
  {
    path: 'breadcrumb',
    loadChildren: () =>
      import('./pages/breadcrumb/breadcrumb.routing').then(
        (m) => m.breadcrumbRouting,
      ),
    data: {
      title: 'pages.breadcrumb.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/fil-dariane/',
        en: 'https://design.ipedis.com/en/web-components/breadcrumb/',
      },
    },
  },
  {
    path: 'fil-dariane',
    loadChildren: () =>
      import('./pages/breadcrumb/breadcrumb.routing').then(
        (m) => m.breadcrumbRouting,
      ),
    data: {
      title: 'pages.breadcrumb.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/fil-dariane/',
        en: 'https://design.ipedis.com/en/web-components/breadcrumb/',
      },
    },
  },
  // Menu
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.routing').then((m) => m.menuRoutes),
    data: {
      title: 'pages.menu.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/menu-burger/',
        en: 'https://design.ipedis.com/en/web-components/burger-menu/',
      },
    },
  },
  // Stepper
  {
    path: 'stepper',
    loadChildren: () =>
      import('./pages/stepper/stepper.routing').then((m) => m.stepperRouting),
    data: {
      title: 'pages.stepper.title',
      backlink: {
        fr: 'https://design.ipedis.com/composants-web/',
        en: 'https://design.ipedis.com/en/web-components/',
      },
    },
  },
];

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'fr',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
  {
    path: ':lang',
    canActivate: [langGuard],
    children: childRoutes,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
