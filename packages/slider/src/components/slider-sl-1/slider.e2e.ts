import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-slider-sl-1', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/slider-sl-1/test/slider.e2e.html');
  });

  test('renders and initializes correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-slider-sl-1 item-to-show="1"><div class="slot-content" slot="slide-1"><h2>Slot 1 Title</h2><p>Content for Slot 1</p></div><div class="slot-content" slot="slide-2"></div><div class="slot-content" slot="slide-3"><p>Content for Slot 3</p></div></ip-slider-sl-1>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-slider-sl-1');
    await expect(element).toBeVisible();

    const sliderItems = page.locator('ip-slider-sl-1').locator('.slider__li');
    await expect(sliderItems).toHaveCount(3);

    const sliderBullets = page.locator('ip-slider-sl-1').locator('.slider-bullets__li');
    await expect(sliderBullets).toHaveCount(3);
  });

  test('navigates to the next slide', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-slider-sl-1 item-to-show="1"><div class="slot-content" slot="slide-1"><h2>Slot 1 Title</h2><p>Content for Slot 1</p></div><div class="slot-content" slot="slide-2"></div><div class="slot-content" slot="slide-3"><p>Content for Slot 3</p></div></ip-slider-sl-1>';
    });
    await page.waitForChanges();

    const nextButton = page.locator('ip-slider-sl-1').locator('.btn-next');
    await expect(nextButton).toBeVisible();

    await nextButton.click();
    await page.waitForChanges();

    const sliderUl = page.locator('ip-slider-sl-1').locator('.slider__ul');
    const leftPosition = await sliderUl.evaluate((el) => getComputedStyle(el).left);
    expect(leftPosition).not.toBe('0px');
  });
});
