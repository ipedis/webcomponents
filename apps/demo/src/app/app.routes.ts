import { Route } from '@angular/router';
import { langGuard } from './core/guards/lang.guard';

const childRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'https://design.ipedis.com',
    pathMatch: 'full',
  },
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
    redirectTo: 'not-found',
  },
];
