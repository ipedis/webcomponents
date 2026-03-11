import { Route } from '@angular/router';
import { langGuard } from './core/guards/lang.guard';

const childRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/accordion/accordion.routing').then(
        (m) => m.accordionRoutes,
      ),
    data: { title: 'Accordion | Demo Web components Ipedis' },
  },
  {
    path: 'tooltip',
    loadChildren: () =>
      import('./pages/tooltip/tooltip.routing').then((m) => m.tooltipRoutes),
    data: { title: 'Tooltip | Demo Web components Ipedis' },
  },
  {
    path: 'dropdown',
    loadChildren: () =>
      import('./pages/dropdown/dropdown.routing').then((m) => m.dropdownRoutes),
    data: { title: 'Dropdown | Demo Web components Ipedis' },
  },
  {
    path: 'toggle',
    loadChildren: () =>
      import('./pages/toggle/toggle.routing').then((m) => m.toggleRoues),
    data: { title: 'Toggle | Demo Web components Ipedis' },
  },
  {
    path: 'radio-button',
    loadChildren: () =>
      import('./pages/radio-button/radio-button.routing').then(
        (m) => m.radioButtonRoutes,
      ),
    data: { title: 'Radio-button | Demo Web components Ipedis' },
  },
  {
    path: 'checkbox',
    loadChildren: () =>
      import('./pages/checkbox/checkbox.routing').then((m) => m.checkboxRoutes),
    data: { title: 'Checkbox | Demo Web components Ipedis' },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.routing').then((m) => m.loginRoutes),
    data: { title: 'Login | Demo Web components Ipedis' },
  },
  {
    path: 'pagination',
    loadChildren: () =>
      import('./pages/pagination/pagination.routing').then(
        (m) => m.paginationRoutes,
      ),
    data: { title: 'Pagination | Demo Web components Ipedis' },
  },
  {
    path: 'table',
    loadChildren: () =>
      import('./pages/table/table.routing').then((m) => m.tableRoutes),
    data: { title: 'Table | Demo Web components Ipedis' },
  },
  {
    path: 'tab-panel',
    loadChildren: () =>
      import('./pages/tab-panel/tab-panel.routing').then(
        (m) => m.tabPanelRoutes,
      ),
    data: { title: 'Tab-panel | Demo Web components Ipedis' },
  },
  {
    path: 'accordion',
    loadChildren: () =>
      import('./pages/accordion/accordion.routing').then(
        (m) => m.accordionRoutes,
      ),
    data: { title: 'Accordion | Demo Web components Ipedis' },
  },
  {
    path: 'modal',
    loadChildren: () =>
      import('./pages/modal/modal.routing').then((m) => m.modalRoutes),
    data: { title: 'Modal | Demo Web components Ipedis' },
  },
  {
    path: 'footnote',
    loadChildren: () =>
      import('./pages/footnote/footnote.routing').then((m) => m.footnoteRoutes),
    data: { title: 'Footnote | Demo Web components Ipedis' },
  },
  {
    path: 'show-more',
    loadChildren: () =>
      import('./pages/show-more/show-more.routing').then(
        (m) => m.showMoreRoutes,
      ),
    data: { title: 'Show-more | Demo Web components Ipedis' },
  },
  {
    path: 'alert',
    loadChildren: () =>
      import('./pages/alert/alert.routing').then((m) => m.alertRouting),
    data: { title: 'Alert | Demo Web components Ipedis' },
  },
  {
    path: 'search-bar',
    loadChildren: () =>
      import('./pages/search-bar/search-bar.routing').then(
        (m) => m.searchBarRouting,
      ),
    data: { title: 'Search-bar | Demo Web components Ipedis' },
  },
  {
    path: 'breadcrumb',
    loadChildren: () =>
      import('./pages/breadcrumb/breadcrumb.routing').then(
        (m) => m.breadcrumbRouting,
      ),
    data: { title: 'Breadcrumb | Demo Web components Ipedis' },
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.routing').then((m) => m.menuRoutes),
    data: { title: 'Menu | Demo Web components Ipedis' },
  },
  {
    path: 'stepper',
    loadChildren: () =>
      import('./pages/stepper/stepper.routing').then((m) => m.stepperRouting),
    data: { title: 'Stepper | Demo Web components Ipedis' },
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
