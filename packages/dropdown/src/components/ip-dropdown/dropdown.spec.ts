import { newSpecPage } from '@stencil/core/testing';
import { Dropdown } from './dropdown';

describe('Dropdown', () => {
  it('renders correctly', async () => {
    const page = await newSpecPage({
      components: [Dropdown],
      html: `<ip-dropdown dropdown-title='Select an option' items-options='["Option 1", "Option 2", "Option 3"]'></ip-dropdown>`,
    });

    expect(page.root).toEqualHtml(`
    <ip-dropdown dropdown-title="Select an option" items-options='["Option 1", "Option 2", "Option 3"]'>
    <mock:shadow-root>
      <div class="dropdown">
        <div class="dropdown-title" id="dropdown-title" >Select an option</div>
        <div class="dropdown-content" tabindex="0" aria-expanded="false" role="combobox" 
        aria-labelledby="dropdown-title">
          <span class="dropdown-head" aria-haspopup="listbox" role="button">Select an option</span>
          <span class="dropdown-arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Icon/CaretDown">
                <path id="Vector" d="M14.625 6.75L9 12.375L3.375 6.75" stroke="#2749A3" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </span>
        </div>
      </div>
      </mock:shadow-root>
    </ip-dropdown>
    `);
  });

  it.skip('opens dropdown when clicked', async () => {
    const page = await newSpecPage({
      components: [Dropdown],
      html: `<ip-dropdown dropdown-title='Select an option' items-options='["Option 1", "Option 2", "Option 3"]'></ip-dropdown>`,
    });

    const dropdown = page.root.shadowRoot.querySelector(
      '.dropdown-content',
    ) as HTMLElement;
    dropdown.click();

    await page.waitForChanges();

    expect(dropdown.getAttribute('aria-expanded')).toBe('true');
  });

  it.skip('closes dropdown when clicked outside', async () => {
    const page = await newSpecPage({
      components: [Dropdown],
      html: `<ip-dropdown dropdown-title='Select an option' items-options='["Option 1", "Option 2", "Option 3"]'></ip-dropdown>`,
    });

    const dropdownContent = page.root.shadowRoot.querySelector(
      '.dropdown-content',
    ) as HTMLElement;
    dropdownContent.click();
    await page.waitForChanges();

    expect(dropdownContent.getAttribute('aria-expanded')).toBe('true');

    const outsideElement = page.doc.body;
    outsideElement.click();
    await page.waitForChanges();

    expect(dropdownContent.getAttribute('aria-expanded')).toBe('false');
  });

  it.skip('selects item from dropdown options', async () => {
    const page = await newSpecPage({
      components: [Dropdown],
      html: `<ip-dropdown dropdown-title='Select an option' items-options='["Option 1", "Option 2", "Option 3"]'></ip-dropdown>`,
    });

    const dropdownContent = page.root.shadowRoot.querySelector(
      '.dropdown-content',
    ) as HTMLElement;

    dropdownContent.click();
    await page.waitForChanges();

    const option2 = page.root.shadowRoot.querySelector(
      '.dropdown-list li:nth-child(2)',
    ) as HTMLElement;
    option2.click();
    await page.waitForChanges();

    const dropdownHead = page.root.shadowRoot.querySelector(
      '.dropdown-head',
    ) as HTMLElement;
    expect(dropdownHead.textContent.trim()).toBe('Option 2');

    expect(dropdownContent.getAttribute('aria-expanded')).toBe('false');
  });
});
