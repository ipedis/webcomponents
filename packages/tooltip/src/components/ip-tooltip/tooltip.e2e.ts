import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-tooltip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/ip-tooltip/test/ip-tooltip.e2e.html');
  });

  test('renders and toggles on click', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-tooltip tooltip-trigger="Trigger Text" tooltip-content="Tooltip content"></ip-tooltip>';
    });
    await page.waitForChanges();

    const tooltip = page.locator('ip-tooltip');
    const trigger = page.locator('ip-tooltip').locator('.tooltip-trigger');

    await trigger.click();

    await expect(tooltip).toHaveClass(/hydrated/);
  });

  test('renders tooltip trigger and content', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-tooltip
          tooltip-content="Content of tooltip"
          tooltip-trigger="Trigger"
        ></ip-tooltip>
      `;
    });
    await page.waitForChanges();

    const tooltip = page.locator('ip-tooltip');
    const trigger = page.locator('ip-tooltip').locator('.tooltip-trigger');

    await expect(tooltip).toHaveClass(/hydrated/);
    await expect(trigger).toHaveText('Trigger');

    await trigger.hover();
    await page.waitForChanges();

    const tooltipContent = page
      .locator('ip-tooltip')
      .locator('.tooltip-content');

    await expect(tooltipContent).toBeVisible();
    await expect(tooltipContent).toHaveText('Content of tooltip');
  });

  test('displays tooltip title if provided', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-tooltip
          tooltip-content="Content of tooltip"
          tooltip-trigger="Trigger"
          tooltip-title="Tooltip Title"
          type="click"
        ></ip-tooltip>
      `;
    });
    await page.waitForChanges();

    const trigger = page.locator('ip-tooltip').locator('.tooltip-trigger');
    await trigger.click();
    await page.waitForChanges();

    const tooltipTitle = page.locator('ip-tooltip').locator('.tooltip-title');

    await expect(tooltipTitle).toBeVisible();
    await expect(tooltipTitle).toHaveText('Tooltip Title');
  });

  test('shows tooltip on hover', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-tooltip
          tooltip-content="Tooltip Content"
          tooltip-trigger="Trigger"
          tooltip-title="Title"
        ></ip-tooltip>
      `;
    });
    await page.waitForChanges();

    const tooltipTrigger = page
      .locator('ip-tooltip')
      .locator('.tooltip-trigger');

    await tooltipTrigger.hover();
    await page.waitForChanges();

    const tooltipContent = page
      .locator('ip-tooltip')
      .locator('.tooltip-content');

    await expect(tooltipContent).toBeVisible();
  });
});
