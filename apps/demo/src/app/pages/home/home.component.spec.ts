import { Route } from '@angular/router';
import { demoLinks } from './home.component';

describe('demoLinks', () => {
  const page = (path: string, title?: string): Route => ({
    path,
    data: title ? { title } : undefined,
  });

  it('lists the demo pages of the language routes', () => {
    const routes: Route[] = [
      { path: '', redirectTo: 'fr' },
      {
        path: ':lang',
        children: [
          page('', 'pages.home.title'),
          page('tooltip', 'pages.tooltip.title'),
          page('infobulle', 'pages.tooltip.title'),
          page('dropdown', 'pages.dropdown.title'),
          page('untitled'),
        ],
      },
    ];

    expect(demoLinks(routes)).toEqual([
      { path: 'tooltip', titleKey: 'pages.tooltip.title' },
      { path: 'dropdown', titleKey: 'pages.dropdown.title' },
    ]);
  });

  it('returns nothing without language routes', () => {
    expect(demoLinks([page('not-found')])).toEqual([]);
  });
});
