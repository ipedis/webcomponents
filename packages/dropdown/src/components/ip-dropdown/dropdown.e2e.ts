import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-dropdown', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/ip-dropdown/test/dropdown.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-dropdown></ip-dropdown>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-dropdown');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('should have a dropdown title', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-dropdown dropdown-title="Select an option"></ip-dropdown>';
    });
    await page.waitForChanges();

    const dropdownTitle = page
      .locator('ip-dropdown')
      .locator('.dropdown-title');
    await expect(dropdownTitle).toHaveText('Select an option');
  });

  test('should have attribute aria-expanded when clicked', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-dropdown></ip-dropdown>';
    });
    await page.waitForChanges();

    const dropdown = page.locator('ip-dropdown').locator('.dropdown-content');
    await expect(dropdown).toHaveAttribute('aria-expanded', 'false');

    await dropdown.click();
    await page.waitForChanges();

    await expect(dropdown).toHaveAttribute('aria-expanded', 'true');
  });

  test('should display options when opened', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-dropdown dropdown-title=\'Select an option\' items-options=\'["Option 1", "Option 2", "Option 3"]\'></ip-dropdown>';
    });
    await page.waitForChanges();

    const dropdownContent = page
      .locator('ip-dropdown')
      .locator('.dropdown-content');
    const dropdownArrow = page
      .locator('ip-dropdown')
      .locator('.dropdown-arrow');

    await expect(dropdownContent).toHaveAttribute('aria-expanded', 'false');

    await dropdownArrow.click();
    await page.waitForChanges();

    await expect(dropdownContent).toHaveAttribute('aria-expanded', 'true');

    const options = page
      .locator('ip-dropdown')
      .locator('.dropdown-list li')
      .all();
    expect((await options).length).toBe(3);

    await expect((await options)[0]).toHaveText('Option 1');
    await expect((await options)[1]).toHaveText('Option 2');
    await expect((await options)[2]).toHaveText('Option 3');
  });

  test('should select item from dropdown', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-dropdown dropdown-title=\'Select an option\' items-options=\'["Option 1", "Option 2", "Option 3"]\'></ip-dropdown>';
    });
    await page.waitForChanges();

    const dropdownContent = page
      .locator('ip-dropdown')
      .locator('.dropdown-content');
    const dropdownArrow = page
      .locator('ip-dropdown')
      .locator('.dropdown-arrow');

    await dropdownArrow.click();
    await page.waitForChanges();

    const option2 = page
      .locator('ip-dropdown')
      .locator('.dropdown-list li:nth-child(2)');
    await option2.click();
    await page.waitForChanges();

    const selectedOption = page
      .locator('ip-dropdown')
      .locator('.dropdown-head');
    await expect(selectedOption).toHaveText('Option 2');

    await expect(dropdownContent).toHaveAttribute('aria-expanded', 'false');
  });

  test('should close dropdown when keydown Escape', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-dropdown dropdown-title=\'Select an option\' items-options=\'["Option 1", "Option 2", "Option 3"]\'></ip-dropdown>';
    });
    await page.waitForChanges();

    const dropdownContent = page
      .locator('ip-dropdown')
      .locator('.dropdown-content');
    const dropdownArrow = page
      .locator('ip-dropdown')
      .locator('.dropdown-arrow');

    await dropdownArrow.click();
    await page.waitForChanges();

    await expect(dropdownContent).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    await expect(dropdownContent).toHaveAttribute('aria-expanded', 'false');
  });
});
