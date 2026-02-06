import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-navigation-bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/menu-2/test/navigation-bar.e2e.html');
  });

  test('renders and initializes correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-navigation-bar></ip-navigation-bar>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-navigation-bar');
    await expect(element).toBeVisible();

    const menuItems = page.locator('ip-navigation-bar').locator('.menu-items');
    await expect(menuItems).toHaveCount(0);
  });

  test('opens and closes submenus with keyboard', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-navigation-bar menu-data='[
          {"label": "Home", "href": "/"},
          {"label": "Services", "href": "/services", "submenus": [{"label": "Web Design", "href": "/services/web-design"},{"label": "SEO", "href": "/services/seo"}]},
          {"label": "Contact", "href": "/contact"}
        ]'></ip-navigation-bar>
      `;
    });
    await page.waitForChanges();

    const menuItem = page
      .locator('ip-navigation-bar')
      .locator('.menu-items button');
    await expect(menuItem).toBeVisible();

    await menuItem.focus();
    await menuItem.press('Enter');
    await page.waitForChanges();

    const submenuContainer = page
      .locator('ip-navigation-bar')
      .locator('.submenu-container');
    await expect(submenuContainer).toHaveAttribute('aria-hidden', 'false');

    await menuItem.press('Escape');
    await page.waitForChanges();

    await expect(submenuContainer).toHaveAttribute('aria-hidden', 'true');
  });
});
