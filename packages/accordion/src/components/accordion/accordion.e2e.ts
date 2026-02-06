import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-accordion', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/accordion/test/accordion.e2e.html');
  });

  test('should render without errors', async ({ page }) => {
    // Set the component HTML in the body
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-accordion></ip-accordion>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-accordion');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('should open the first panel when isFirstPanelOpen is true', async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-accordion is-first-panel-open='true' accordion-headers='[{"title":"Panel 1","ariaText":"panel-1"}]'>
          <div slot="accordion-1">Content 1</div>
        </ip-accordion>
      `;
    });
    await page.waitForChanges();

    const firstPanel = page
      .locator('ip-accordion')
      .locator('.js-panel')
      .first();
    await expect(firstPanel).toBeVisible();
    await expect(firstPanel).toHaveCSS('display', 'block');
  });

  test('should set aria-expanded attribute correctly when toggling panels', async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-accordion accordion-headers='[{"title":"Panel 1","ariaText":"panel-1"}]'>
          <div slot="accordion-1">Content 1</div>
        </ip-accordion>
      `;
    });
    await page.waitForChanges();

    const headerButton = page
      .locator('ip-accordion')
      .locator('.js-acc-button button')
      .first();

    await expect(headerButton).toHaveAttribute('aria-expanded', 'false');

    await headerButton.click();
    await page.waitForChanges();

    await expect(headerButton).toHaveAttribute('aria-expanded', 'true');

    await headerButton.click();
    await page.waitForChanges();

    await expect(headerButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should toggle panel visibility when a header button is clicked', async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-accordion accordion-headers='[{"title":"Panel 1","ariaText":"panel-1"}]'>
          <div slot="accordion-1">Content 1</div>
        </ip-accordion>
      `;
    });
    await page.waitForChanges();

    const headerButton = page
      .locator('ip-accordion')
      .locator('.js-acc-button button')
      .first();
    const panel = page.locator('ip-accordion').locator('.js-panel').first();

    await headerButton.click();
    await page.waitForChanges();

    await expect(panel).toBeVisible();
    await expect(panel).toHaveCSS('display', 'block');

    await headerButton.click();
    await page.waitForChanges();

    await expect(panel).toHaveCSS('display', 'none');
  });
});
