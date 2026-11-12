import { expect, test } from '@playwright/test';

// Every file a page asks for must exist. The production build inlines the
// critical CSS, whose font URLs once pointed at /media/ instead of
// /webcomponents/media/: run this suite against `npm run demo:ssr` too
// (E2E_BASE_URL, see README.md).

const PAGES = ['fr', 'en/accordion', 'fr/alert/danger-alert', 'fr/tooltip'];

for (const path of PAGES) {
  test(`${path}: every requested file loads`, async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (response) => {
      if (response.status() >= 400) {
        failed.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto(path);
    await page.waitForLoadState('networkidle');

    expect(failed).toEqual([]);
  });
}
