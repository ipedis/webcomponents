import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-alert', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/alert/test/alert.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-alert></ip-alert>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-alert');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('should render with the correct title and message', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-alert alert-title="Test Title" message="Test Message"></ip-alert>';
    });
    await page.waitForChanges();

    const title = page.locator('ip-alert').locator('.title');
    const message = page.locator('ip-alert').locator('.message');
    await expect(title).toHaveText(' Test Title');
    await expect(message).toHaveText('Test Message');
  });

  test('should have a type attribute with value "info"', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-alert type="info"></ip-alert>';
    });
    await page.waitForChanges();

    const alert = page.locator('ip-alert').locator('.alert');
    await expect(alert).toHaveClass(/alert-info/);
  });

  test('should hide when the close button is clicked', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-alert></ip-alert>';
    });
    await page.waitForChanges();

    const closeButton = page.locator('ip-alert').locator('.close-button');
    await closeButton.click();
    await page.waitForChanges();

    // After closing, the .alert div should no longer exist (render returns null)
    const alertDiv = page.locator('ip-alert').locator('.alert');
    await expect(alertDiv).toHaveCount(0);
  });
});
