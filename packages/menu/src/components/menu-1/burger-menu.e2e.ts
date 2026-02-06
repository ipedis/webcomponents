import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-burger-menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/menu-1/test/burger-menu.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-burger-menu></ip-burger-menu>';
    });
    await page.waitForChanges();
    
    const element = page.locator('ip-burger-menu');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('has correct ARIA attributes on the menu button', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-burger-menu></ip-burger-menu>';
    });
    await page.waitForChanges();

    const menuButton = page.locator('ip-burger-menu').locator('.burger-menu-btn');
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
    await expect(menuButton).toHaveAttribute('aria-controls', 'burger-menu');
  });

  test('hides the menu initially', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-burger-menu></ip-burger-menu>';
    });
    await page.waitForChanges();

    const menu = page.locator('ip-burger-menu').locator('#burger-menu');
    await expect(menu).not.toBeVisible();
  });

  test('should show the menu when the button is clicked', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-burger-menu></ip-burger-menu>';
    });
    await page.waitForChanges();

    const menuButton = page.locator('ip-burger-menu').locator('.burger-menu-btn');
    await menuButton.click();
    await page.waitForChanges();

    const menu = page.locator('ip-burger-menu').locator('#burger-menu');
    await expect(menu).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should close the menu when the button is clicked again', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-burger-menu></ip-burger-menu>';
    });
    await page.waitForChanges();

    const menuButton = page.locator('ip-burger-menu').locator('.burger-menu-btn');
    await menuButton.click();
    await page.waitForChanges();

    await menuButton.click();
    await page.waitForChanges();

    const menu = page.locator('ip-burger-menu').locator('#burger-menu');
    await expect(menu).not.toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
