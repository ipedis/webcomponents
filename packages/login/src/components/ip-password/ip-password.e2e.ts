import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-password', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/ip-password/test/ip-password.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-password></ip-password>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-password');
    await expect(element).toHaveClass(/hydrated/);

    const input = element.locator('input');
    await expect(input).toHaveAttribute('type', 'password');
  });

  test('toggles password visibility', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-password></ip-password>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-password');
    await expect(element).toHaveClass(/hydrated/);

    const input = element.locator('input');
    const button = element.locator('button');

    await expect(input).toHaveAttribute('type', 'password');

    await button.click();
    await page.waitForChanges();

    await expect(input).toHaveAttribute('type', 'text');

    await button.click();
    await page.waitForChanges();

    await expect(input).toHaveAttribute('type', 'password');
  });
});
