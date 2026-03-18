import { Breadcrumb1Component } from './breadcrumb1/breadcrumb1.component';
import { Route } from '@angular/router';

export const breadcrumbRouting: Route[] = [
  {
    path: '',
    component: Breadcrumb1Component,
  },
  {
    path: 'breadcrumb1',
    component: Breadcrumb1Component,
  },
];
