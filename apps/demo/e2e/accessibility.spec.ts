import { BrowserContext, Page, chromium, test } from '@playwright/test';
import {
  wrapPlaywrightPage,
  playwrightConfig,
  PlaywrightController,
} from '@axe-core/watcher/playwright';
import { loadLocalEnvFile } from '../server/config';

// Reads AXE_DEVELOPER_HUB_API_KEY from a local .env, like the SSR server.
loadLocalEnvFile();

const API_KEY = process.env['AXE_DEVELOPER_HUB_API_KEY'];

/** Pages audited on axe Developer Hub. */
const PAGES = [
  { name: 'home page', path: 'fr' },
  { name: 'accordion page', path: 'fr/accordion' },
  { name: 'alert page', path: 'fr/alert' },
  { name: 'table page', path: 'fr/table' },
  { name: 'form components', path: 'fr/checkbox' },
];

test.describe('Accessibility Tests', () => {
  // The results go to axe Developer Hub, which needs an API key.
  test.skip(!API_KEY, 'AXE_DEVELOPER_HUB_API_KEY is not set');

  let browserContext: BrowserContext;
  // The page axe watches: the tests navigate with it, not with the `page`
  // fixture, which lives in another browser context.
  let axePage: Page;
  let controller: PlaywrightController;

  test.beforeEach(async ({ baseURL }) => {
    browserContext = await chromium.launchPersistentContext('', {
      ...playwrightConfig({
        axe: {
          apiKey: API_KEY ?? '',
          timeout: {
            flush: 10000,
          },
        },
        channel: 'chromium',
        args: ['--headless=new'],
      }),
      // A context created by hand does not inherit the config's baseURL.
      baseURL,
    });
    axePage = await browserContext.newPage();
    controller = new PlaywrightController(axePage);

    wrapPlaywrightPage(axePage, controller);
  });

  test.afterEach(async () => {
    // Flush test results to axe Developer Hub
    try {
      await controller.flush();
    } catch (error) {
      console.warn('Failed to flush accessibility results:', error);
    }
    await browserContext.close();
  });

  for (const { name, path } of PAGES) {
    test(`should pass accessibility audit on ${name}`, async () => {
      await axePage.goto(path);
      await axePage.waitForLoadState('networkidle');
      await axePage.getByRole('heading', { level: 1 }).waitFor();

      // The axe-watcher scans the page automatically: wait until the web
      // components are rendered.
      await axePage.waitForTimeout(2000);
    });
  }
});
