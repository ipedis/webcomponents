import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/ip-toggle/test/ip-toggle.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-toggle></ip-toggle>';
    });
    await page.waitForChanges();
    
    const toggle = page.locator('ip-toggle');
    const button = page.locator("ip-toggle").locator("input[type='checkbox']");

    await expect(toggle).toHaveClass(/hydrated/);
    await expect(button).toHaveAttribute('role', 'switch');
  });

  test('renders changes when label change', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-toggle active-label="Oui" inactive-label="Non"></ip-toggle>';
    });
    await page.waitForChanges();
    
    const toggle = page.locator('ip-toggle');
    const paragraph = page.locator('ip-toggle').locator('p');

    await expect(paragraph).toHaveText('Non');

    await toggle.evaluate((el: any) => {
      el.inactiveLabel = 'Nop';
    });
    await page.waitForChanges();

    await expect(paragraph).toHaveText('Nop');
  });

  test('should be unchecked by default', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-toggle active-label="Oui" inactive-label="Non"></ip-toggle>';
    });
    await page.waitForChanges();
    
    const button = page.locator("ip-toggle").locator("input[type='checkbox']");
    const paragraph = page.locator('ip-toggle').locator('p');

    await expect(button).toHaveAttribute('aria-checked', 'false');
    await expect(button).not.toHaveClass('active');
    await expect(paragraph).toHaveText('Non');
  });

  test('should be checked when clicked', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-toggle active-label="Oui" inactive-label="Non"></ip-toggle>';
    });
    await page.waitForChanges();
    
    const button = page.locator("ip-toggle").locator("input[type='checkbox']");
    const paragraph = page.locator('ip-toggle').locator('p');

    await button.click();
    await page.waitForChanges();

    await expect(button).toHaveAttribute('aria-checked', 'true');
    await expect(button).toHaveClass(/active/);
    await expect(paragraph).toHaveText('Oui');
  });
});
