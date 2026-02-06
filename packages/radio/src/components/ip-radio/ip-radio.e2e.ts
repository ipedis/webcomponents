import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-radio', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/ip-radio/test/ip-radio.e2e.html');
  });

  test('renders correctly with default values', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'></ip-radio>
      `;
    });
    await page.waitForChanges();

    const element = page.locator('ip-radio');
    await expect(element).toHaveClass(/hydrated/);

    const radioInputs = page.locator('ip-radio').locator('input');
    await expect(radioInputs).toHaveCount(2);

    const labels = page.locator('ip-radio').locator('label');
    await expect(labels).toHaveCount(2);
    await expect(labels.nth(0)).toHaveText('Option 1');
    await expect(labels.nth(1)).toHaveText('Option 2');

    const value0 = await radioInputs
      .nth(0)
      .evaluate((el: HTMLInputElement) => el.value);
    const value1 = await radioInputs
      .nth(1)
      .evaluate((el: HTMLInputElement) => el.value);
    expect(value0).toBe('1');
    expect(value1).toBe('2');
  });

  test('emits selectionChanged event on option change', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'></ip-radio>
      `;
    });
    await page.waitForChanges();

    const selectionChangedPromise = page.evaluate(() => {
      return new Promise((resolve) => {
        const radioComponent = document.querySelector('ip-radio');
        radioComponent.addEventListener(
          'selectionChanged',
          (e: any) => {
            resolve(e.detail);
          },
          { once: true },
        );
      });
    });

    const radioInput = page.locator('ip-radio').locator('input').first();
    await radioInput.click();

    const eventDetail = await selectionChangedPromise;
    expect(eventDetail).toEqual({
      id: '1',
      label: 'Option 1',
    });
  });

  test('disables and does not emit selectionChanged event on disabled option', async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2", "disabled": true}]'></ip-radio>
      `;
    });
    await page.waitForChanges();

    const disabledRadioInput = page
      .locator('ip-radio')
      .locator('input[disabled]');

    let eventFired = false;
    await page.evaluate(() => {
      const radioComponent = document.querySelector('ip-radio');
      radioComponent.addEventListener('selectionChanged', () => {
        (window as any).eventFired = true;
      });
    });

    await disabledRadioInput.click({ force: true });
    await page.waitForTimeout(100);

    eventFired = await page.evaluate(() => (window as any).eventFired || false);
    expect(eventFired).toBe(false);

    const isDisabled = await disabledRadioInput.evaluate(
      (el: HTMLInputElement) => el.disabled,
    );
    expect(isDisabled).toBe(true);

    const isChecked = await disabledRadioInput.evaluate(
      (el: HTMLInputElement) => el.checked,
    );
    expect(isChecked).toBe(false);
  });

  test('sets aria-checked attribute correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'></ip-radio>
      `;
    });
    await page.waitForChanges();

    const radioInputs = page.locator('ip-radio').locator('input');
    await expect(radioInputs.nth(0)).toHaveAttribute('aria-checked', 'false');
    await expect(radioInputs.nth(1)).toHaveAttribute('aria-checked', 'false');

    await radioInputs.nth(0).click();
    await page.waitForChanges();

    await expect(radioInputs.nth(0)).toHaveAttribute('aria-checked', 'true');
    await expect(radioInputs.nth(1)).toHaveAttribute('aria-checked', 'false');

    await radioInputs.nth(1).click();
    await page.waitForChanges();

    await expect(radioInputs.nth(0)).toHaveAttribute('aria-checked', 'false');
    await expect(radioInputs.nth(1)).toHaveAttribute('aria-checked', 'true');
  });
});
