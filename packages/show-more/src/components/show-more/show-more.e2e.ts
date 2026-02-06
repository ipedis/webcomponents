import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-show-more', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/show-more/test/show-more.e2e.html');
  });

  test('should display "Show More" initially', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-show-more><div slot="content">Here is the additional content.</div></ip-show-more>';
    });
    await page.waitForChanges();

    const button = page.locator('ip-show-more').locator('button');
    await expect(button).toHaveText('Show More');
  });

  test('should display "Show Less" after clicking', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-show-more><div slot="content">Here is the additional content.</div></ip-show-more>';
    });
    await page.waitForChanges();

    const button = page.locator('ip-show-more').locator('button');
    await button.click();
    await page.waitForChanges();
    await expect(button).toHaveText('Show Less');
  });

  test('should toggle content visibility on button click', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-show-more><div slot="content">Here is the additional content.</div></ip-show-more>';
    });
    await page.waitForChanges();

    const button = page.locator('ip-show-more').locator('button');

    let content = page.locator('ip-show-more').locator('.content');
    await expect(content).not.toBeVisible();

    await button.click();
    await page.waitForChanges();

    await expect(content).toBeVisible();

    await button.click();
    await page.waitForChanges();

    await expect(content).not.toBeVisible();
  });
});
