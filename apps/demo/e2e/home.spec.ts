import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should redirect the root to the French home page', async ({ page }) => {
    await page.goto('./');

    await expect(page).toHaveURL(/\/webcomponents\/fr$/);
  });

  test('should load the home page', async ({ page }) => {
    await page.goto('fr');

    await expect(page).toHaveTitle('Démos des composants | A11Y Design System');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Démos des composants',
    );
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('fr');
    await page.waitForLoadState('networkidle');

    const links = page.locator('main a[href]');
    expect(await links.count()).toBeGreaterThan(0);
  });
});
