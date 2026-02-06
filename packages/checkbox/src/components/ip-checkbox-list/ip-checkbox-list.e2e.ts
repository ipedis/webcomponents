import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-checkbox-list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/ip-checkbox-list/test/ip-checkbox-list.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-checkbox-list ></ip-checkbox-list>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-checkbox-list');
    await expect(element).toHaveClass(/hydrated/);
  });
});

