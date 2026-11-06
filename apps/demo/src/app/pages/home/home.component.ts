import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

export interface DemoLink {
  path: string;
  titleKey: string;
}

/**
 * One link per demo page, read from the `:lang` children of the router
 * config so the list never drifts from the routes. French aliases share the
 * title of their English route and are left out, so every link text is unique.
 */
export function demoLinks(routes: Route[]): DemoLink[] {
  const pages = routes.find((route) => route.path === ':lang')?.children ?? [];
  const seen = new Set<string>();
  const links: DemoLink[] = [];
  for (const { path, data } of pages) {
    const titleKey = data?.['title'] as string | undefined;
    if (!path || !titleKey || seen.has(titleKey)) {
      continue;
    }
    seen.add(titleKey);
    links.push({ path, titleKey });
  }
  return links;
}

/** "Démo Infobulle | A11Y Design System" becomes "Démo Infobulle". */
function pageName(title: string): string {
  return title.split('|')[0].trim();
}

// Shown on the language root routes when HOME_REDIRECT=false (local testing);
// in production these routes redirect to the design system instead. Some pages
// share a translated title ("toggle" and "simple-toggle"), so each link also
// shows its path to keep every link text unique.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  template: `
    <div class="home">
      <h1>{{ 'pages.home.heading' | transloco }}</h1>
      <p>{{ 'pages.home.intro' | transloco }}</p>
      <ul>
        @for (link of links; track link.path) {
          <li>
            <a [routerLink]="link.path"
              >{{ pageName(link.titleKey | transloco) }}
              <span class="path">/{{ link.path }}</span></a
            >
          </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .home {
        padding: 2rem 1rem;
      }
      ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
        gap: 0.5rem 2rem;
        padding: 0;
        list-style: none;
      }
      a {
        color: #132c54;
      }
      .path {
        display: block;
        font-family: monospace;
        font-size: 0.875rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly links = demoLinks(inject(Router).config);
  protected readonly pageName = pageName;
}
