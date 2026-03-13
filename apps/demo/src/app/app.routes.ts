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
    data: { title: 'pages.tooltip.title' },
  },
  {
    path: 'dropdown',
    loadChildren: () =>
      import('./pages/dropdown/dropdown.routing').then((m) => m.dropdownRoutes),
    data: { title: 'pages.dropdown.title' },
  },
  {
    path: 'toggle',
    loadChildren: () =>
      import('./pages/toggle/toggle.routing').then((m) => m.toggleRoues),
    data: { title: 'pages.toggle.title' },
  },
  {
    path: 'radio-button',
    loadChildren: () =>
      import('./pages/radio-button/radio-button.routing').then(
        (m) => m.radioButtonRoutes,
      ),
    data: { title: 'pages.radio-button.title' },
  },
  {
    path: 'checkbox',
    loadChildren: () =>
      import('./pages/checkbox/checkbox.routing').then((m) => m.checkboxRoutes),
    data: { title: 'pages.checkbox.title' },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.routing').then((m) => m.loginRoutes),
    data: { title: 'pages.login.title' },
  },
  {
    path: 'pagination',
    loadChildren: () =>
      import('./pages/pagination/pagination.routing').then(
        (m) => m.paginationRoutes,
      ),
    data: { title: 'pages.pagination.title' },
  },
  {
    path: 'table',
    loadChildren: () =>
      import('./pages/table/table.routing').then((m) => m.tableRoutes),
    data: { title: 'pages.table.title' },
  },
  {
    path: 'tab-panel',
    loadChildren: () =>
      import('./pages/tab-panel/tab-panel.routing').then(
        (m) => m.tabPanelRoutes,
      ),
    data: { title: 'pages.tab-panel.title' },
  },
  {
    path: 'accordion',
    loadChildren: () =>
      import('./pages/accordion/accordion.routing').then(
        (m) => m.accordionRoutes,
      ),
    data: { title: 'pages.accordion.title' },
  },
  {
    path: 'modal',
    loadChildren: () =>
      import('./pages/modal/modal.routing').then((m) => m.modalRoutes),
    data: { title: 'pages.modal.title' },
  },
  {
    path: 'footnote',
    loadChildren: () =>
      import('./pages/footnote/footnote.routing').then((m) => m.footnoteRoutes),
    data: { title: 'pages.footnote.title' },
  },
  {
    path: 'show-more',
    loadChildren: () =>
      import('./pages/show-more/show-more.routing').then(
        (m) => m.showMoreRoutes,
      ),
    data: { title: 'pages.show-more.title' },
  },
  {
    path: 'alert',
    loadChildren: () =>
      import('./pages/alert/alert.routing').then((m) => m.alertRouting),
    data: { title: 'pages.alert.title' },
  },
  {
    path: 'search-bar',
    loadChildren: () =>
      import('./pages/search-bar/search-bar.routing').then(
        (m) => m.searchBarRouting,
      ),
    data: { title: 'pages.search-bar.title' },
  },
  {
    path: 'breadcrumb',
    loadChildren: () =>
      import('./pages/breadcrumb/breadcrumb.routing').then(
        (m) => m.breadcrumbRouting,
      ),
    data: { title: 'pages.breadcrumb.title' },
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.routing').then((m) => m.menuRoutes),
    data: { title: 'pages.menu.title' },
  },
  {
    path: 'stepper',
    loadChildren: () =>
      import('./pages/stepper/stepper.routing').then((m) => m.stepperRouting),
    data: { title: 'pages.stepper.title' },
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
