import { newSpecPage } from 'jest-stencil-runner';
import { IpCheckbox } from './ip-checkbox';

describe('ip-checkbox', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [IpCheckbox],
      html: '<ip-checkbox></ip-checkbox>',
    });
    expect(root).toEqualHtml(`
      <ip-checkbox>
        <mock:shadow-root>
          <div class="checkbox-content">
              <label class="checkbox-label">
                <input 
                class="checkbox-input"
                type="checkbox">
                <slot></slot>
              </label>
          </div>
        </mock:shadow-root>
      </ip-checkbox>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [IpCheckbox],
      html: `  <ip-checkbox checked="true" identifier="check me">Check me !</ip-checkbox>`,
    });
    expect(root).toEqualHtml(`
     <ip-checkbox checked="true" identifier="check me">
       <mock:shadow-root>
         <div class="checkbox-content">          
           <label class="checkbox-label" for="check me">
           <input defaultchecked="" class="checkbox-input" id="check me" type="checkbox">
             <slot></slot>
           </label>
         </div>
       </mock:shadow-root>
       Check me !
     </ip-checkbox>
    `);
  });
});
