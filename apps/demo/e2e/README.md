# Demo App E2E Tests

End-to-end tests of the demo application, with Playwright.

## Test Files

- `home.spec.ts` - Home page: root redirect, title, links
- `demo-basic.spec.ts` - Main component pages load with their web component
- `interactions.spec.ts` - Focus of the alerts, language switch, code tabs,
  translated server HTML: what change detection must keep working
- `accessibility.spec.ts` - Audit on axe Developer Hub (see `axe.md`), skipped
  without `AXE_DEVELOPER_HUB_API_KEY`

## Running Tests

```bash
# Starts the dev server on port 4201, then runs the tests
npm run e2e:demo

# Against a server already running on port 4200 (`npm run serve`)
npx playwright test -c apps/demo/playwright.config.manual.ts

# Against the production build (`HOME_REDIRECT=false npm run demo:ssr`)
E2E_BASE_URL=http://localhost:4000/webcomponents/ \
  npx playwright test -c apps/demo/playwright.config.manual.ts
```

`npm run e2e:demo` waits forever when `nx serve demo` already runs on this
machine (Nx does not run the same serve task twice): stop it, or use the
manual config.

In CI, `npm run e2e:demo` runs after the build (`.github/workflows/test.yml`,
`npm run run:ci`).

## Configuration

- **Browser**: Chromium only
- **Base URL**: the app's base href, `http://localhost:4201/webcomponents/`.
  Test paths are relative to it: `page.goto('fr/alert')`, not `'/fr/alert'`.
  `E2E_BASE_URL` overrides it.
- **Server**: started with `HOME_REDIRECT=false` (the list of demos instead of
  the production redirect) and `MATOMO_ENABLED=false`
- **Retries**: 2 in CI
