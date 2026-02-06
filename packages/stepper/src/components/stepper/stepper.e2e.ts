import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-stepper', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/stepper/test/stepper.e2e.html');
  });

  test('should render and display the initial step correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-stepper steps="3"></ip-stepper>';
    });
    await page.waitForChanges();

    const stepIndicator = page.locator('ip-stepper').locator('.step-indicator span');
    await expect(stepIndicator).toHaveText('Step 1 / 3');
  });

  test('should update the step when clicking continue button', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-stepper steps="3"></ip-stepper>';
    });
    await page.waitForChanges();

    const continueButton = page.locator('ip-stepper').locator('.continue-button');
    await continueButton.click();
    await page.waitForChanges();

    const stepIndicator = page.locator('ip-stepper').locator('.step-indicator span');
    await expect(stepIndicator).toHaveText('Step 2 / 3');
  });

  test('should show back button when not on the first step', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-stepper steps="3"></ip-stepper>';
    });
    await page.waitForChanges();

    const continueButton = page.locator('ip-stepper').locator('.continue-button');
    await continueButton.click();
    await page.waitForChanges();

    const backButton = page.locator('ip-stepper').locator('.back-button');
    await expect(backButton).toBeVisible();
  });

  test('should hide back button on the first step', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-stepper steps="3"></ip-stepper>';
    });
    await page.waitForChanges();

    const backButton = page.locator('ip-stepper').locator('.back-button');
    await expect(backButton).not.toBeVisible();
  });

  test('should render step content correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-stepper steps="2">
          <div slot="step1">Content for Step 1</div>
          <div slot="step2">Content for Step 2</div>
        </ip-stepper>
      `;
    });
    await page.waitForChanges();

    let stepContent = page.locator('ip-stepper').locator('.step-content');
    const innerHTML1 = await stepContent.innerHTML();
    expect(innerHTML1).toContain('<slot name="step1"></slot>');

    const continueButton = page.locator('ip-stepper').locator('.continue-button');
    await continueButton.click();
    await page.waitForChanges();

    const innerHTML2 = await stepContent.innerHTML();
    expect(innerHTML2).toContain('<slot name="step2"></slot>');
  });
});
