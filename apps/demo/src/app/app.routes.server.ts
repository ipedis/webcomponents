import { RenderMode, ServerRoute } from '@angular/ssr';

// Every route is rendered per request: the page depends on the runtime
// configuration (APP_CONFIG), which a prerendered page would freeze at build.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
