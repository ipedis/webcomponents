import { newSpecPage } from 'jest-stencil-runner';
import { IpCheckboxList } from './ip-checkbox-list';

describe('ip-checkbox-list', () => {
  it('renders with errors', async () => {
    /* global global */
    const mockedConsole = jest
      .spyOn(global.console, 'error')
      .mockImplementation();

    const { root } = await newSpecPage({
      components: [IpCheckboxList],
      html: `<ip-checkbox-list options="{}"></ip-checkbox-list>`,
    });

    expect(console.error).toHaveBeenCalledTimes(1);

    expect(root).toEqualHtml(`
      <ip-checkbox-list options="{}">
         <mock:shadow-root>
           <div class="checkbox-list">
             <fieldset class="checkbox-content">
             <div class="checkbox-elements"></div>
             </fieldset>
           </div>
         </mock:shadow-root>
      </ip-checkbox-list>
    `);

    mockedConsole.mockRestore();
  });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [IpCheckboxList],
      html: `<ip-checkbox-list></ip-checkbox-list>`,
    });

    expect(root).toEqualHtml(`
      <ip-checkbox-list>
         <mock:shadow-root>
           <div class="checkbox-list">
             <fieldset class="checkbox-content">
             <div class="checkbox-elements"></div>
             </fieldset>
           </div>
         </mock:shadow-root>
      </ip-checkbox-list>
    `);
  });

  it('renders with options', async () => {
    const { root } = await newSpecPage({
      components: [IpCheckboxList],
      html: `<ip-checkbox-list
                legend="Preferences:"
                options='[
                    {"id": "1", "label": "Option 1"},
                    {"id": "2", "label": "Option 2"},
                    {"id": "3", "label": "Option 3"}
                ]'
                >
             </ip-checkbox-list>"`,
    });
    expect(root).toEqualHtml(`
      <ip-checkbox-list legend="Preferences:" options="[
                    {&quot;id&quot;: &quot;1&quot;, &quot;label&quot;: &quot;Option 1&quot;},
                    {&quot;id&quot;: &quot;2&quot;, &quot;label&quot;: &quot;Option 2&quot;},
                    {&quot;id&quot;: &quot;3&quot;, &quot;label&quot;: &quot;Option 3&quot;}
                ]">
        <mock:shadow-root>
    <div class="checkbox-list">
      <fieldset class="checkbox-content">
        <legend class="legend">Preferences:</legend>
        <div class="checkbox-elements">
          <div class="wrapper">
            <span
              role="checkbox"
              aria-labelledby="1-label"
              id="1"
              aria-checked="false"
              tabindex="0"
              class="custom-checkbox"
              aria-disabled="false"
              ><span class="checkbox-icon" aria-hidden="false"></span></span
            ><label id="1-label" class="checkbox-label">Option 1</label>
          </div>
          <div class="wrapper">
            <span
              role="checkbox"
              aria-labelledby="2-label"
              id="2"
              aria-checked="false"
              tabindex="0"
              class="custom-checkbox"
              aria-disabled="false"
              ><span class="checkbox-icon" aria-hidden="false"></span></span
            ><label id="2-label" class="checkbox-label">Option 2</label>
          </div>
          <div class="wrapper">
            <span
              role="checkbox"
              aria-labelledby="3-label"
              id="3"
              aria-checked="false"
              tabindex="0"
              class="custom-checkbox"
              aria-disabled="false"
              ><span class="checkbox-icon" aria-hidden="false"></span></span
            ><label id="3-label" class="checkbox-label">Option 3</label>
          </div>
        </div>
      </fieldset>
    </div>
        </mock:shadow-root>
      </ip-checkbox-list>
    `);
  });
  it('renders with options default checked', async () => {
    const { root } = await newSpecPage({
      components: [IpCheckboxList],
      html: `<ip-checkbox-list
                legend="Preferences:"
                options='[
                    {"id": "1", "label": "Option 1", "defaultChecked": true},
                    {"id": "2", "label": "Option 2"},
                    {"id": "3", "label": "Option 3"}
                ]'
                >
             </ip-checkbox-list>"`,
    });
    expect(root).toEqualHtml(`
      <ip-checkbox-list legend="Preferences:" options="[
                    {&quot;id&quot;: &quot;1&quot;, &quot;label&quot;: &quot;Option 1&quot;, &quot;defaultChecked&quot;: true},
                    {&quot;id&quot;: &quot;2&quot;, &quot;label&quot;: &quot;Option 2&quot;},
                    {&quot;id&quot;: &quot;3&quot;, &quot;label&quot;: &quot;Option 3&quot;}
                ]">
        <mock:shadow-root>
   <div class="checkbox-list">
      <fieldset class="checkbox-content">
        <legend class="legend">Preferences:</legend>
        <div class="checkbox-elements">
          <div class="wrapper">
            <span
              role="checkbox"
              aria-labelledby="1-label"
              id="1"
              aria-checked="true"
              tabindex="0"
              class="custom-checkbox checked"
              aria-disabled="false"
              ><span class="checkbox-icon" aria-hidden="true">✓</span></span
            ><label id="1-label" class="checkbox-label checked">Option 1</label>
          </div>
          <div class="wrapper">
            <span
              role="checkbox"
              aria-labelledby="2-label"
              id="2"
              aria-checked="false"
              tabindex="0"
              class="custom-checkbox"
              aria-disabled="false"
              ><span class="checkbox-icon" aria-hidden="false"></span></span
            ><label id="2-label" class="checkbox-label">Option 2</label>
          </div>
          <div class="wrapper">
            <span
              role="checkbox"
              aria-labelledby="3-label"
              id="3"
              aria-checked="false"
              tabindex="0"
              class="custom-checkbox"
              aria-disabled="false"
              ><span class="checkbox-icon" aria-hidden="false"></span></span
            ><label id="3-label" class="checkbox-label">Option 3</label>
          </div>
        </div>
      </fieldset>
    </div>
        </mock:shadow-root>
      </ip-checkbox-list>
    `);
  });
});
