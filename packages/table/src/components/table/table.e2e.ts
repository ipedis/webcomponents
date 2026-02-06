import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/table/test/table.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-table></ip-table>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-table');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('renders table with headers and rows', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-table
          columns='[
            { "header": "Name" , "type": "string"},
            { "header": "Age", "type": "number" }
          ]'
          rows='[
            {"Name":"Alice", "Age":25},
            {"Name":"Bob", "Age":30}
          ]'
        ></ip-table>
      `;
    });
    await page.waitForChanges();

    const headers = page.locator('ip-table').locator('th');
    await expect(headers).toHaveCount(2);
    await expect(headers.nth(0)).toContainText('Name');
    await expect(headers.nth(1)).toContainText('Age');

    const rows = page.locator('ip-table').locator('tbody tr');
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText('Alice');
    await expect(rows.nth(0)).toContainText('25');
    await expect(rows.nth(1)).toContainText('Bob');
    await expect(rows.nth(1)).toContainText('30');
  });

  test('sorts columns correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-table
          columns='[
            { "header": "Name" , "type": "string"},
            { "header": "Age", "type": "number" }
          ]'
          rows='[
            {"Name":"Alice", "Age":25},
            {"Name":"Bob", "Age":30}
          ]'
        ></ip-table>
      `;
    });
    await page.waitForChanges();

    const nameHeaderButton = page
      .locator('ip-table')
      .locator('th')
      .nth(0)
      .locator('button');
    await expect(nameHeaderButton).toBeVisible();
    await nameHeaderButton.click();
    await page.waitForChanges();

    const sortedRows = page.locator('ip-table').locator('tbody tr');
    await expect(sortedRows.nth(0)).toContainText('Alice');
    await expect(sortedRows.nth(1)).toContainText('Bob');

    await nameHeaderButton.click();
    await page.waitForChanges();

    await expect(sortedRows.nth(0)).toContainText('Bob');
    await expect(sortedRows.nth(1)).toContainText('Alice');
  });

  test('sorts numeric columns correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-table
          columns='[
            { "header": "Name" , "type": "string"},
            { "header": "Age", "type": "number" }
          ]'
          rows='[
            {"Name":"Alice", "Age":25},
            {"Name":"Bob", "Age":30},
            {"Name":"Charlie", "Age":20}
          ]'
        ></ip-table>
      `;
    });
    await page.waitForChanges();

    const ageHeaderButton = page
      .locator('ip-table')
      .locator('th')
      .nth(1)
      .locator('button');
    await expect(ageHeaderButton).toBeVisible();
    await ageHeaderButton.click();
    await page.waitForChanges();

    const sortedRows = page.locator('ip-table').locator('tbody tr');
    await expect(sortedRows.nth(0)).toContainText('Charlie');
    await expect(sortedRows.nth(1)).toContainText('Alice');
    await expect(sortedRows.nth(2)).toContainText('Bob');

    await ageHeaderButton.click();
    await page.waitForChanges();

    await expect(sortedRows.nth(0)).toContainText('Bob');
    await expect(sortedRows.nth(1)).toContainText('Alice');
    await expect(sortedRows.nth(2)).toContainText('Charlie');
  });
});
