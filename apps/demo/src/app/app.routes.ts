import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { APP_CONFIG } from './core/config/app-config.providers';
import { langGuard } from './core/guards/lang.guard';

const childRoutes: Route[] = [
  // Language root: redirect to the design system (production), or list the
  // demos when HOME_REDIRECT=false (local testing).
  // Both routes share the same path: the router tries them in order and
  // canMatch skips the first one when homeRedirect is false. Keep the
  // guarded route first, or the home page would always win.
  {
    path: '',
    pathMatch: 'full',
    canMatch: [() => inject(APP_CONFIG).homeRedirect],
    loadComponent: () =>
      import('./pages/external-redirect/external-redirect.component').then(
        (m) => m.ExternalRedirectComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: {
      title: 'pages.home.title',
      description: 'pages.home.description',
    },
  },
  // Tooltip
  {
    path: 'tooltip',
    loadChildren: () =>
      import('./pages/tooltip/tooltip.routing').then((m) => m.tooltipRoutes),
    data: {
      title: 'pages.tooltip.title',
      description: 'pages.tooltip.description',
      backlink: {
        fr: '/composants-web/infobulle/',
        en: '/en/web-components/tooltip/',
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
      description: 'pages.tooltip.click.description',
      backlink: {
        fr: '/composants-web/infobulle/',
        en: '/en/web-components/tooltip/',
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
      description: 'pages.tooltip.hover.description',
      backlink: {
        fr: '/composants-web/infobulle/',
        en: '/en/web-components/tooltip/',
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
      description: 'pages.tooltip.click.description',
      backlink: {
        fr: '/composants-web/infobulle/',
        en: '/en/web-components/tooltip/',
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
      description: 'pages.tooltip.hover.description',
      backlink: {
        fr: '/composants-web/infobulle/',
        en: '/en/web-components/tooltip/',
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
      description: 'pages.dropdown.description',
      backlink: {
        fr: '/composants-web/',
        en: '/en/web-components/',
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
      description: 'pages.toggle.description',
      backlink: {
        fr: '/composants-web/bascule/',
        en: '/en/web-components/toggle/',
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
      description: 'pages.toggle.simple.description',
      backlink: {
        fr: '/composants-web/bascule/',
        en: '/en/web-components/toggle/',
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
      description: 'pages.toggle.with-text.description',
      backlink: {
        fr: '/composants-web/bascule/',
        en: '/en/web-components/toggle/',
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
      description: 'pages.toggle.with-indication.description',
      backlink: {
        fr: '/composants-web/bascule/',
        en: '/en/web-components/toggle/',
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
      description: 'pages.toggle.simple.description',
      backlink: {
        fr: '/composants-web/bascule/',
        en: '/en/web-components/toggle/',
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
      description: 'pages.toggle.with-text.description',
      backlink: {
        fr: '/composants-web/bascule/',
        en: '/en/web-components/toggle/',
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
      description: 'pages.toggle.with-indication.description',
      backlink: {
        fr: '/composants-web/bascule/',
        en: '/en/web-components/toggle/',
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
      description: 'pages.radio-button.description',
      backlink: {
        fr: '/composants-web/bouton-radio/',
        en: '/en/web-components/radio-button/',
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
      description: 'pages.radio-button.description',
      backlink: {
        fr: '/composants-web/bouton-radio/',
        en: '/en/web-components/radio-button/',
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
      description: 'pages.checkbox.description',
      backlink: {
        fr: '/composants-web/case-a-cocher/',
        en: '/en/web-components/checkbox/',
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
      description: 'pages.checkbox.simple.description',
      backlink: {
        fr: '/composants-web/case-a-cocher/',
        en: '/en/web-components/checkbox/',
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
      description: 'pages.checkbox.list.description',
      backlink: {
        fr: '/composants-web/case-a-cocher/',
        en: '/en/web-components/checkbox/',
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
      description: 'pages.checkbox.simple.description',
      backlink: {
        fr: '/composants-web/case-a-cocher/',
        en: '/en/web-components/checkbox/',
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
      description: 'pages.checkbox.list.description',
      backlink: {
        fr: '/composants-web/case-a-cocher/',
        en: '/en/web-components/checkbox/',
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
      description: 'pages.login.description',
      backlink: {
        fr: '/composants-web/champ-de-mot-de-passe/',
        en: '/en/web-components/password-input/',
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
      description: 'pages.login.email.description',
      backlink: {
        fr: '/composants-web/champ-de-mot-de-passe/',
        en: '/en/web-components/password-input/',
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
      description: 'pages.login.username.description',
      backlink: {
        fr: '/composants-web/champ-de-mot-de-passe/',
        en: '/en/web-components/password-input/',
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
      description: 'pages.login.email.description',
      backlink: {
        fr: '/composants-web/champ-de-mot-de-passe/',
        en: '/en/web-components/password-input/',
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
      description: 'pages.login.username.description',
      backlink: {
        fr: '/composants-web/champ-de-mot-de-passe/',
        en: '/en/web-components/password-input/',
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
      description: 'pages.pagination.description',
      backlink: {
        fr: '/composants-web/pagination/',
        en: '/en/web-components/pagination/',
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
      description: 'pages.table.description',
      backlink: {
        fr: '/composants-web/tableaux/',
        en: '/en/web-components/tables/',
      },
    },
  },
  {
    path: 'tableaux',
    loadChildren: () =>
      import('./pages/table/table.routing').then((m) => m.tableRoutes),
    data: {
      title: 'pages.table.title',
      description: 'pages.table.description',
      backlink: {
        fr: '/composants-web/tableaux/',
        en: '/en/web-components/tables/',
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
      description: 'pages.tab-panel.description',
      backlink: {
        fr: '/composants-web/panneau-donglet/',
        en: '/en/web-components/tab-panel/',
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
      description: 'pages.tab-panel.description',
      backlink: {
        fr: '/composants-web/panneau-donglet/',
        en: '/en/web-components/tab-panel/',
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
      description: 'pages.accordion.description',
      backlink: {
        fr: '/composants-web/accordeon/',
        en: '/en/web-components/accordion/',
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
      description: 'pages.accordion.description',
      backlink: {
        fr: '/composants-web/accordeon/',
        en: '/en/web-components/accordion/',
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
      description: 'pages.modal.description',
      backlink: {
        fr: '/composants-web/fenetre-modale/',
        en: '/en/web-components/modal-window/',
      },
    },
  },
  {
    path: 'fenetre-modale',
    loadChildren: () =>
      import('./pages/modal/modal.routing').then((m) => m.modalRoutes),
    data: {
      title: 'pages.modal.title',
      description: 'pages.modal.description',
      backlink: {
        fr: '/composants-web/fenetre-modale/',
        en: '/en/web-components/modal-window/',
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
      description: 'pages.footnote.description',
      backlink: {
        fr: '/composants-web/',
        en: '/en/web-components/',
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
      description: 'pages.show-more.description',
      backlink: {
        fr: '/composants-web/',
        en: '/en/web-components/',
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
      description: 'pages.alert.description',
      backlink: {
        fr: '/composants-web/',
        en: '/en/web-components/',
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
      description: 'pages.search-bar.description',
      backlink: {
        fr: '/composants-web/',
        en: '/en/web-components/',
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
      description: 'pages.breadcrumb.description',
      backlink: {
        fr: '/composants-web/fil-dariane/',
        en: '/en/web-components/breadcrumb/',
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
      description: 'pages.breadcrumb.description',
      backlink: {
        fr: '/composants-web/fil-dariane/',
        en: '/en/web-components/breadcrumb/',
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
      description: 'pages.menu.description',
      backlink: {
        fr: '/composants-web/menu-burger/',
        en: '/en/web-components/burger-menu/',
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
      description: 'pages.stepper.description',
      backlink: {
        fr: '/composants-web/',
        en: '/en/web-components/',
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
