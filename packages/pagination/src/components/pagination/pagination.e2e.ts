import { expect, type Page } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('ip-pagination', () => {
  test.beforeEach(async ({ page }) => {
    // Load the HTML template which includes the Stencil entry scripts
    await page.goto('/components/pagination/test/pagination.e2e.html');
  });

  test('renders', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-pagination></ip-pagination>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-pagination');
    await expect(element).toHaveClass(/hydrated/);
  });

  test('should navigate to the next page', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-pagination></ip-pagination>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-pagination');
    const nextButton = page.locator('ip-pagination').locator('.next');

    await nextButton.click();
    await page.waitForChanges();

    const currentPage = await element.evaluate(
      (el: HTMLIpPaginationElement) => el.currentPage,
    );
    expect(currentPage).toBe(2);
  });

  test('should navigate to the previous page', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML =
        '<ip-pagination current-page=3></ip-pagination>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-pagination');
    const prevButton = page.locator('ip-pagination').locator('.previous');

    await prevButton.click();
    await page.waitForChanges();

    const currentPage = await element.evaluate(
      (el: HTMLIpPaginationElement) => el.currentPage,
    );
    expect(currentPage).toBe(2);
  });

  test('should navigate to the last page and the first page', async ({
    page,
  }) => {
    await page.evaluate(() => {
      document.body.innerHTML = '<ip-pagination></ip-pagination>';
    });
    await page.waitForChanges();

    const element = page.locator('ip-pagination');
    const lastButton = page.locator('ip-pagination').locator('.last');
    const firstButton = page.locator('ip-pagination').locator('.first');

    await lastButton.click();
    await page.waitForChanges();
    const currentPage = await element.evaluate(
      (el: HTMLIpPaginationElement) => el.currentPage,
    );
    expect(currentPage).toBe(10);

    await firstButton.click();
    await page.waitForChanges();
    const currentPage2 = await element.evaluate(
      (el: HTMLIpPaginationElement) => el.currentPage,
    );
    expect(currentPage2).toBe(1);
  });

  test.describe('focus management', () => {
    const activeButtonLabel = (el: Element) =>
      el.shadowRoot?.activeElement?.getAttribute('aria-label') ?? null;

    test('does not move focus on resize or programmatic page change', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.body.innerHTML =
          '<input id="outside" /><ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();

      const outside = page.locator('#outside');
      await outside.focus();

      // Crossing the compact breakpoint re-renders the component.
      await page.setViewportSize({ width: 400, height: 800 });
      await page.waitForChanges();
      await expect(
        page.locator('ip-pagination').locator('button[part="page-btn"]'),
      ).toHaveCount(3);
      await expect(outside).toBeFocused();

      await page
        .locator('ip-pagination')
        .evaluate((el: HTMLIpPaginationElement) => (el.currentPage = 4));
      await page.waitForChanges();
      await expect(outside).toBeFocused();
    });

    test('keeps focus on the activated page button', async ({ page }) => {
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();

      const element = page.locator('ip-pagination');
      await element.locator('button[aria-label="Page 3"]').focus();
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(
        await element.evaluate((el: HTMLIpPaginationElement) => el.currentPage),
      ).toBe(3);
      expect(await element.evaluate(activeButtonLabel)).toBe('Page 3');
    });

    test('keeps focus on "next" while it stays enabled', async ({ page }) => {
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();

      const element = page.locator('ip-pagination');
      await element.locator('.next').focus();
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(await element.evaluate(activeButtonLabel)).toBe(
        'Go to the next page',
      );
    });

    test('moves focus to the current page when the activated button becomes disabled', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();

      const element = page.locator('ip-pagination');
      await element.locator('.last').focus();
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(
        await element.evaluate((el: HTMLIpPaginationElement) => el.currentPage),
      ).toBe(10);
      expect(await element.evaluate(activeButtonLabel)).toBe('Page 10');
    });
  });

  test.describe('visible pages', () => {
    const pageButtons = (page: Page) =>
      page.locator('ip-pagination').locator('button[part="page-btn"]');

    test('shows 3 pages on a narrow viewport and restores visible-pages on a wide one', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1024, height: 800 });
      await page.evaluate(() => {
        document.body.innerHTML =
          '<ip-pagination visible-pages="7" total-pages="20"></ip-pagination>';
      });
      await page.waitForChanges();
      await expect(pageButtons(page)).toHaveCount(7);

      await page.setViewportSize({ width: 400, height: 800 });
      await page.waitForChanges();
      await expect(pageButtons(page)).toHaveCount(3);

      await page.setViewportSize({ width: 1024, height: 800 });
      await page.waitForChanges();
      await expect(pageButtons(page)).toHaveCount(7);

      const visiblePages = await page
        .locator('ip-pagination')
        .evaluate((el: HTMLIpPaginationElement) => el.visiblePages);
      expect(visiblePages).toBe(7);
    });

    test('starts in compact mode on a narrow viewport', async ({ page }) => {
      await page.setViewportSize({ width: 400, height: 800 });
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();
      await expect(pageButtons(page)).toHaveCount(3);
    });

    test('updates the page buttons when visible-pages changes', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1024, height: 800 });
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();
      await expect(pageButtons(page)).toHaveCount(5);

      await page
        .locator('ip-pagination')
        .evaluate((el: HTMLIpPaginationElement) => (el.visiblePages = 8));
      await page.waitForChanges();
      await expect(pageButtons(page)).toHaveCount(8);
    });
  });

  test.describe('pageChanged event', () => {
    test('is emitted with the new page when the user navigates', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();
      const pageChanged = await page.spyOnEvent('pageChanged');
      const element = page.locator('ip-pagination');

      await element.locator('.next').click();
      await page.waitForChanges();
      expect(pageChanged).toHaveReceivedEventTimes(1);
      expect(pageChanged).toHaveReceivedEventDetail(2);

      await element.locator('button[aria-label="Page 4"]').click();
      await page.waitForChanges();
      expect(pageChanged).toHaveReceivedEventTimes(2);
      expect(pageChanged).toHaveReceivedEventDetail(4);

      await element.locator('.last').click();
      await page.waitForChanges();
      expect(pageChanged).toHaveReceivedEventTimes(3);
      expect(pageChanged).toHaveReceivedEventDetail(10);
    });

    test('is not emitted when the current page is clicked again', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
      });
      await page.waitForChanges();
      const pageChanged = await page.spyOnEvent('pageChanged');

      await page
        .locator('ip-pagination')
        .locator('button[aria-current="page"]')
        .click();
      await page.waitForChanges();
      expect(pageChanged).toHaveReceivedEventTimes(0);
    });

    test('is not emitted when current-page or total-pages is set by the application', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.body.innerHTML =
          '<ip-pagination current-page="8"></ip-pagination>';
      });
      await page.waitForChanges();
      const pageChanged = await page.spyOnEvent('pageChanged');
      const element = page.locator('ip-pagination');

      await element.evaluate(
        (el: HTMLIpPaginationElement) => (el.currentPage = 3),
      );
      await page.waitForChanges();

      await element.evaluate(
        (el: HTMLIpPaginationElement) => (el.currentPage = 9),
      );
      await page.waitForChanges();
      // Shrinking totalPages clamps currentPage.
      await element.evaluate(
        (el: HTMLIpPaginationElement) => (el.totalPages = 5),
      );
      await page.waitForChanges();

      expect(
        await element.evaluate((el: HTMLIpPaginationElement) => el.currentPage),
      ).toBe(5);
      expect(pageChanged).toHaveReceivedEventTimes(0);
    });

    test('lets a listener set currentPage without looping', async ({
      page,
    }) => {
      await page.evaluate(() => {
        document.body.innerHTML = '<ip-pagination></ip-pagination>';
        const el = document.querySelector('ip-pagination');
        let calls = 0;
        el.addEventListener('pageChanged', (event: CustomEvent<number>) => {
          calls++;
          el.dataset.pageChangedCalls = String(calls);
          el.currentPage = event.detail;
        });
      });
      await page.waitForChanges();

      const element = page.locator('ip-pagination');
      await element.locator('.next').click();
      await page.waitForChanges();

      await expect(element).toHaveAttribute('data-page-changed-calls', '1');
      expect(
        await element.evaluate((el: HTMLIpPaginationElement) => el.currentPage),
      ).toBe(2);
    });
  });

  test.describe('current page bounds', () => {
    test('clamps an out of range current-page', async ({ page }) => {
      await page.evaluate(() => {
        document.body.innerHTML =
          '<ip-pagination total-pages="10" current-page="50"></ip-pagination>';
      });
      await page.waitForChanges();
      const element = page.locator('ip-pagination');
      expect(
        await element.evaluate((el: HTMLIpPaginationElement) => el.currentPage),
      ).toBe(10);

      await element.evaluate(
        (el: HTMLIpPaginationElement) => (el.currentPage = -3),
      );
      await page.waitForChanges();
      expect(
        await element.evaluate((el: HTMLIpPaginationElement) => el.currentPage),
      ).toBe(1);
      await expect(
        element.locator('button[aria-current="page"]'),
      ).toHaveAttribute('aria-label', 'Page 1');
    });
  });
});
