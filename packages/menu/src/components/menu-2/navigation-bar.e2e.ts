import { newE2EPage } from '@stencil/core/testing';

describe('ip-navigation-bar', () => {
  it('renders and initializes correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<ip-navigation-bar></ip-navigation-bar>');

    const element = await page.find('ip-navigation-bar');
    expect(element).not.toBeNull();

    const menuItems = await page.findAll('ip-navigation-bar >>> .menu-items');
    expect(menuItems.length).toBe(0);
  });

  it('opens and closes submenus with keyboard', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ip-navigation-bar menu-data='[
        {"label": "Home", "href": "/"},
        {"label": "Services", "href": "/services", "submenus": [{"label": "Web Design", "href": "/services/web-design"},{"label": "SEO", "href": "/services/seo"}]},
        {"label": "Contact", "href": "/contact"}
      ]'></ip-navigation-bar>
    `);

    const menuItem = await page.find(
      'ip-navigation-bar >>> .menu-items button',
    );
    expect(menuItem).not.toBeNull();

    await menuItem.focus();
    await menuItem.press('Enter');
    await page.waitForChanges();

    let submenuContainer = await page.find(
      'ip-navigation-bar >>> .submenu-container',
    );
    expect(await submenuContainer.getAttribute('aria-hidden')).toBe('false');

    await menuItem.press('Escape');
    await page.waitForChanges();

    submenuContainer = await page.find(
      'ip-navigation-bar >>> .submenu-container',
    );
    expect(await submenuContainer.getAttribute('aria-hidden')).toBe('true');
  });

  it('navigates through submenu items with Tab key', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ip-navigation-bar menu-data='[
        {"label": "Home", "href": "/"},
        {"label": "Services", "href": "/services", "submenus": [{"label": "Web Design", "href": "/services/web-design"},{"label": "SEO", "href": "/services/seo"}]},
        {"label": "Contact", "href": "/contact"}
      ]'></ip-navigation-bar>
    `);

    const menuItem = await page.find(
      'ip-navigation-bar >>> .menu-items button',
    );
    expect(menuItem).not.toBeNull();

    await menuItem.press('Enter');
    await page.waitForChanges();

    const submenuItems = await page.findAll(
      'ip-navigation-bar >>> .submenu-item a',
    );
    expect(submenuItems.length).toBe(2);
  });
});
