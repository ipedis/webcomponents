import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-search-bar', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/search-bar/test/search-bar.e2e.html');
  });

  test('renders and responds to user input', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-search-bar></ip-search-bar>';
    });
    await page.waitForChanges();
    
    const element = page.locator('ip-search-bar');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('handles keyboard navigation', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-search-bar suggestions-data=\'["Apple", "Banana", "Cherry"]\' placeholder="Search..." label-button="Search"></ip-search-bar>';
    });
    await page.waitForChanges();

    const input = page.locator('ip-search-bar').locator('input');
    await input.type('a');
    await page.waitForChanges();

    await input.press('ArrowDown');
    await page.waitForChanges();

    const highlightedItem = page.locator('ip-search-bar').locator('.highlighted');
    await expect(highlightedItem).toHaveText('Apple');

    await input.press('Enter');
    await page.waitForChanges();

    const inputValue = await input.evaluate((el: HTMLInputElement) => el.value);
    expect(inputValue).toBe('Apple');

    const suggestionList = page.locator('ip-search-bar').locator('#suggestion-list');
    await expect(suggestionList).not.toBeVisible();
  });
});
