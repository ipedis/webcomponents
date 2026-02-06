import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-modal', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/modal/test/modal.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-modal></ip-modal>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-modal');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('should open modal when button is clicked', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-modal button-text="open"><div slot="content">The content</div></ip-modal>';
    });
    await page.waitForChanges();

    const openButton = page.locator('ip-modal').locator('.dialog-button');
    await openButton.click();
    await page.waitForChanges();

    const modal = page.locator('ip-modal').locator('dialog');
    await expect(modal).toHaveAttribute('open');

    const closeButton = page.locator('ip-modal').locator('.close-dialog');
    await closeButton.click();
    await page.waitForChanges();
    await expect(modal).not.toHaveAttribute('open');
  });
});
