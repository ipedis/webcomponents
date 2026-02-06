import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-tab-panel', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/tab-panel/test/tab-panel.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-tab-panel title-tag="h1" selected-tab="tab-content-1" tab-panel-title="Audit RGAA" tab-panel-headers=\'[{"title":"Accessibilité"}, {"title":"Pdf Document"}, {"title":"Statistical"}, {"title":"Certification"}, {"title":"Legislation"}]\'> </ip-tab-panel>';
    });
    await page.waitForChanges();
    
    const tabPanel = page.locator('ip-tab-panel');
    await expect(tabPanel).toHaveClass(/hydrated/);
  });

  test('renders changes when tabPanelTitle change', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-tab-panel title-tag="h1" selected-tab="tab-content-1" tab-panel-title="Audit RGAA" tab-panel-headers=\'[{"title":"Accessibilité"}, {"title":"Pdf Document"}, {"title":"Statistical"}, {"title":"Certification"}, {"title":"Legislation"}]\'> </ip-tab-panel>';
    });
    await page.waitForChanges();
    
    const tabPanel = page.locator('ip-tab-panel');
    const title = page.locator('ip-tab-panel').locator('h1');
    await expect(title).toHaveText('Audit RGAA');
    
    await tabPanel.evaluate((el: any) => {
      el.tabPanelTitle = 'New Title';
    });
    await page.waitForChanges();
    
    await expect(title).toHaveText('New Title');
  });
});
