import { Route } from '@angular/router';
import { Toogle1Component } from './toogle1/toogle1.component';
import { Toogle2Component } from './toogle2/toogle2.component';
import { Toogle3Component } from './toogle3/toogle3.component';

export const toggleRoues: Route[] = [
  {
    path: '',
    component: Toogle1Component,
    data: {
      title: 'pages.toggle.simple.title',
    },
  },
  {
    path: 'toggle1',
    component: Toogle1Component,
    data: {
      title: 'pages.toggle.simple.title',
    },
  },
  {
    path: 'toggle2',
    component: Toogle2Component,
    data: {
      title: 'pages.toggle.with-text.title',
    },
  },
  {
    path: 'toggle3',
    component: Toogle3Component,
    data: {
      title: 'pages.toggle.with-indication.title',
    },
  },
];
