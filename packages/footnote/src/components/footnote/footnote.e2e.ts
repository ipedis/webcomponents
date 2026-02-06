import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-footnote', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/footnote/test/footnote.e2e.html');
  });

  test('renders correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-footnote identifier="1" text="This is a footnote."></ip-footnote>';
    });
    await page.waitForChanges();

    const component = page.locator('ip-footnote');
    await expect(component).toHaveClass(/hydrated/);
  });
});
