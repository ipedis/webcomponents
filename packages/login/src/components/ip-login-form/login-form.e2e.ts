/* eslint-disable no-undef */
import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-login', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/ip-login-form/test/login-form.e2e.html');
  });

  test('renders and interacts correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-login></ip-login>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-login');
    await expect(element).toBeDefined();

    const title = element.locator('.title p');
    await expect(title).toBeDefined();
    await expect(title).toHaveText('Login');

    const usernameInput = element.locator('input[name="username"]');
    await expect(usernameInput).toBeDefined();
    await usernameInput.fill('testuser');
    await expect(usernameInput).toHaveValue('testuser');

    const passwordInput = element.locator('input[name="password"]');
    await expect(passwordInput).toBeDefined();
    await passwordInput.fill('TestPassword1');
    await expect(passwordInput).toHaveValue('TestPassword1');

    const submitButton = element.locator('button[type="submit"]');
    await expect(submitButton).toBeDefined();
    await submitButton.click();
    await page.waitForChanges();

    await expect(usernameInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
  });
});
