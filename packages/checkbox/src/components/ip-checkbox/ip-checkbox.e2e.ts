import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-checkbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/ip-checkbox/test/ip-checkbox.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-checkbox></ip-checkbox>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-checkbox');
    await expect(element).toHaveClass(/hydrated/);
  });

  test("should have a type attribute with value 'checkbox'", async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-checkbox></ip-checkbox>';
    });
    await page.waitForChanges();

    const input = page.locator('ip-checkbox').locator('input');
    await expect(input).toHaveAttribute('type', 'checkbox');
  });

  test('should have attribute checked when clicked and should drop attribute checked when clicked again', async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-checkbox></ip-checkbox>';
    });
    await page.waitForChanges();

    const input = page.locator('ip-checkbox').locator('input');
    await expect(input).not.toHaveAttribute('checked');

    await input.click();
    await page.waitForChanges();
    await expect(input).toHaveAttribute('checked');

    await input.click();
    await page.waitForChanges();
    await expect(input).not.toHaveAttribute('checked');
  });

  test('should toggle the checked attribute when the space keyboard is pressed', async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-checkbox></ip-checkbox>';
    });
    await page.waitForChanges();

    const input = page.locator('ip-checkbox').locator('input');
    await expect(input).not.toHaveAttribute('checked');

    await input.focus();
    await page.waitForChanges();
    await input.press('Space');
    await page.waitForChanges();
    await expect(input).toHaveAttribute('checked');
  });

  test('should render label properly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-checkbox identifier="firstCheckbox">Check me !</ip-checkbox>';
    });
    await page.waitForChanges();

    const input = page.locator('ip-checkbox').locator('input');
    await expect(input).toHaveAttribute('id', 'firstCheckbox');

    const label = page.locator('ip-checkbox').locator('label');
    await expect(label).toHaveAttribute('for', 'firstCheckbox');
  });
});
