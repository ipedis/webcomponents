import { test, expect } from '@playwright/test';

/** A demo page, its French heading and the web component it shows. */
const PAGES = [
  { path: 'fr/accordion', heading: 'Accordéon', component: 'ip-accordion' },
  { path: 'fr/alert', heading: 'Alerte de succès', component: 'ip-alert' },
  { path: 'fr/table', heading: 'Tableau', component: 'ip-table' },
];

test.describe('Demo App - Basic Tests', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('fr');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  for (const { path, heading, component } of PAGES) {
    test(`should navigate to ${path}`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
      await expect(page.locator(component).first()).toBeVisible();
    });
  }
});
