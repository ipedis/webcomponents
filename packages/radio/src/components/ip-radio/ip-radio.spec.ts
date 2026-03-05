import { newSpecPage } from 'jest-stencil-runner';
import { IpRadio } from './ip-radio';

describe('IpRadio Component', () => {
  it('renders options correctly', async () => {
    const page = await newSpecPage({
      components: [IpRadio],
      html: `<ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'></ip-radio>`,
    });

    expect(page.root).toEqualHtml(`
      <ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'>
        <mock:shadow-root>
    <fieldset class="custom-fieldset"  >
      <div >
        <div class="">
          <input
            type="radio"
            id="1"
            name="ip-radio-group"
            value="1"
             
            aria-checked="false"
          /><label for="1">Option 1</label>
        </div>
        <div class="">
          <input
            type="radio"
            id="2"
            name="ip-radio-group"
            value="2"
             
            aria-checked="false"
          /><label for="2">Option 2</label>
        </div>
      </div>
    </fieldset>
        </mock:shadow-root>
      </ip-radio>
    `);
  });
  it('emits selectionChanged event on option change', async () => {
    const page = await newSpecPage({
      components: [IpRadio],
      html: `<ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'></ip-radio>`,
    });

    const inputElements = page.root.shadowRoot.querySelectorAll('input');
    const eventSpy = jest.fn();
    page.root.addEventListener('selectionChanged', eventSpy);

    inputElements[0].dispatchEvent(new Event('change'));

    expect(eventSpy).toHaveBeenCalled();
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <ip-radio options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'>
        <mock:shadow-root>
    <fieldset class="custom-fieldset"  >
      <div >
        <div class="">
          <input
            type="radio"
            id="1"
            name="ip-radio-group"
            value="1"
              checked
            aria-checked="true"
          /><label for="1">Option 1</label>
        </div>
        <div class="">
          <input
            type="radio"
            id="2"
            name="ip-radio-group"
            value="2"
             
            aria-checked="false"
          /><label for="2">Option 2</label>
        </div>
      </div>
    </fieldset>
        </mock:shadow-root>
      </ip-radio>
    `);
  });

  it('initializes selectedOption state to null', async () => {
    const page = await newSpecPage({
      components: [IpRadio],
      html: `<ip-radio options='[{"id": "1", "label": "Option 1"}]'></ip-radio>`,
    });

    expect(page.root).toEqualHtml(`
      <ip-radio options='[{"id": "1", "label": "Option 1"}]'>
        <mock:shadow-root>
    <fieldset class="custom-fieldset"  >
      <div >
        <div class="">
          <input
            type="radio"
            id="1"
            name="ip-radio-group"
            value="1"
             
            aria-checked="false"
          /><label for="1">Option 1</label>
        </div>
      </div>
    </fieldset>
        </mock:shadow-root>
      </ip-radio>
    `);

    expect(page.rootInstance.selectedOption).toBeNull();
  });
  it('renders options correctly with legend', async () => {
    const page = await newSpecPage({
      components: [IpRadio],
      html: `<ip-radio legend="Legend" options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'></ip-radio>`,
    });

    expect(page.root).toEqualHtml(`
      <ip-radio legend="Legend" options='[{"id": "1", "label": "Option 1"}, {"id": "2", "label": "Option 2"}]'>
      <mock:shadow-root>
    <fieldset class="custom-fieldset"  >
      <legend>Legend</legend>
      <div >
        <div class="">
          <input
            type="radio"
            id="1"
            name="ip-radio-group"
            value="1"
             
            aria-checked="false"
          /><label for="1">Option 1</label>
        </div>
        <div class="">
          <input
            type="radio"
            id="2"
            name="ip-radio-group"
            value="2"
             
            aria-checked="false"
          /><label for="2">Option 2</label>
        </div>
      </div>
    </fieldset>
        </mock:shadow-root>
      </ip-radio>
    `);
  });
});
