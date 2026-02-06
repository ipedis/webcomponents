import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-email', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/ip-email/test/ip-email.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-email></ip-email>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-email');
    await expect(element).toHaveClass(/hydrated/);

    const input = element.locator('input');
    await expect(input).toHaveAttribute('type', 'string');
  });

  test('renders with values', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-email input-label="Username" required></ip-email>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-email');
    await expect(element).toHaveClass(/hydrated/);

    const label = element.locator('label');
    await expect(label).toHaveText('Username*');
  });
});
