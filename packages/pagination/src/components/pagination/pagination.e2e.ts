import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-pagination', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/pagination/test/pagination.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-pagination></ip-pagination>';
    });
    await page.waitForChanges();
    
    const element = page.locator('ip-pagination');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('should navigate to the next page', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-pagination></ip-pagination>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-pagination');
    const nextButton = page.locator('ip-pagination').locator('.next');

    await nextButton.click();
    await page.waitForChanges();

    const currentPage = await element.evaluate((el: any) => el.currentPage);
    expect(currentPage).toBe(2);
  });

  test('should navigate to the previous page', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-pagination current-page=3></ip-pagination>';
    });
    await page.waitForChanges();
    
    const element = page.locator('ip-pagination');
    const prevButton = page.locator('ip-pagination').locator('.previous');

    await prevButton.click();
    await page.waitForChanges();

    const currentPage = await element.evaluate((el: any) => el.currentPage);
    expect(currentPage).toBe(2);
  });

  test('should navigate to the last page and the first page', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-pagination></ip-pagination>';
    });
    await page.waitForChanges();
    
    const element = page.locator('ip-pagination');
    const lastButton = page.locator('ip-pagination').locator('.last');
    const firstButton = page.locator('ip-pagination').locator('.first');

    await lastButton.click();
    await page.waitForChanges();
    const currentPage = await element.evaluate((el: any) => el.currentPage);
    expect(currentPage).toBe(10);

    await firstButton.click();
    await page.waitForChanges();
    const currentPage2 = await element.evaluate((el: any) => el.currentPage);
    expect(currentPage2).toBe(1);
  });
});
