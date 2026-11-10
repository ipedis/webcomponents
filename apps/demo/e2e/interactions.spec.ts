import { expect, Page, test } from '@playwright/test';

// Behaviours that depend on change detection running at the right time:
// they must keep working with or without zone.js.

const ALERTS = ['success-alert', 'info-alert', 'warning-alert', 'danger-alert'];

/** Opens a page and waits until it has settled (lazy chunks, web components). */
async function open(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

for (const alert of ALERTS) {
  test(`${alert}: the focus follows closing and reopening`, async ({
    page,
  }) => {
    await open(page, `fr/alert/${alert}`);
    const close = page.locator('ip-alert .close-button');
    const show = page.getByRole('button', { name: 'Show alert' });

    await close.click();
    await expect(show).toBeFocused();

    await show.click();
    await expect(close).toBeFocused();
  });
}

test('the language switch updates the header', async ({ page }) => {
  await open(page, 'fr/alert/danger-alert');
  const lang = page.locator('header .lang button');
  await expect(lang).toContainText('Anglais');

  await lang.click();

  await expect(page).toHaveURL(/\/en\/alert\/danger-alert$/);
  await expect(lang).toContainText('French');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('the CSS tab of a code snippet gets selected', async ({ page }) => {
  await open(page, 'fr/alert/danger-alert');
  await page.getByRole('button', { name: 'Code' }).click();
  const css = page.getByRole('tab', { name: 'CSS' }).first();

  await css.click();

  await expect(css).toHaveAttribute('aria-selected', 'true');
});

test('the server renders translated HTML', async ({ request }) => {
  const html = await (await request.get('fr')).text();

  expect(html).toContain(
    '<title>Démos des composants | A11Y Design System</title>',
  );
  // A missing translation shows its key, such as "pages.home.title".
  expect(html).not.toMatch(/>\s*(pages|common)\.[a-z]/);
});
