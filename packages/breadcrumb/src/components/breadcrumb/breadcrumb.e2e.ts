import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-breadcrumb', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/breadcrumb/test/breadcrumb.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-breadcrumb></ip-breadcrumb>';
    });
    await page.waitForChanges();
    
    const element = page.locator('ip-breadcrumb');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('renders breadcrumb title with correct attributes', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-breadcrumb
          breadcrumb-title="Bread"
          breadcrumb-items='[
            {"label": "Home", "link": "/home"},
            {"label": "Category", "link": "/Category"},
            {"label": "Item"}
          ]'
        ></ip-breadcrumb>
      `;
    });
    await page.waitForChanges();

    const breadcrumbTitle = page.locator('ip-breadcrumb').locator('h1[part="title"]');
    await expect(breadcrumbTitle).toHaveText('Bread');
    await expect(breadcrumbTitle).toHaveAttribute('part', 'title');
  });

  test('renders breadcrumb items correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-breadcrumb
          breadcrumb-title="Bread"
          breadcrumb-items='[
            {"label": "Home", "link": "/home"},
            {"label": "Category", "link": "/Category"},
            {"label": "Item"}
          ]'
        ></ip-breadcrumb>
      `;
    });
    await page.waitForChanges();

    const breadcrumbItems = page.locator('ip-breadcrumb').locator('.breadcrumb-item').all();
    expect((await breadcrumbItems).length).toBe(3);

    const firstItem = (await breadcrumbItems)[0].locator('a');
    await expect(firstItem).toHaveText('Home');
    await expect(firstItem).toHaveAttribute('href', '/home');

    const secondItem = (await breadcrumbItems)[1].locator('a');
    await expect(secondItem).toHaveText('Category');
    await expect(secondItem).toHaveAttribute('href', '/Category');

    const thirdItem = (await breadcrumbItems)[2].locator('span');
    await expect(thirdItem).toHaveText('Item');
  });
});

