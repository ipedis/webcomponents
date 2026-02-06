import { newSpecPage } from 'jest-stencil-runner';
import { ToggleButton } from './toggle';

describe('ip-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ToggleButton],
      html: '<ip-toggle></ip-toggle>',
    });
    expect(page.root).toEqualHtml(`
      <ip-toggle>
        <mock:shadow-root>
        <div class="switch-container">
        <label htmlFor="switch-label">
        <slot name="switch-label"></slot>
      </label>
           <div class="switch-button">
           <input aria-checked="false" class="medium switch-checkbox" role="switch" type="checkbox"   id="switch-label">
               <span class="medium switch-icon"></span>
          </div>

        </div>
        </mock:shadow-root>
      </ip-toggle>
    `);
  });

  it('renders with values', async () => {
    const page = await newSpecPage({
      components: [ToggleButton],
      html: `<ip-toggle active-label="Oui" inactive-label="Non"></ip-toggle>`,
    });
    expect(page.root).toEqualHtml(`
    <ip-toggle active-label="Oui" inactive-label="Non">
        <mock:shadow-root>
          <div class="switch-container">
          <label htmlFor="switch-label">
          <slot name="switch-label"></slot>
        </label>
            <div class="switch-button">            
            <input aria-checked="false" class="medium switch-checkbox" role="switch" type="checkbox"   id="switch-label">
              <span class="medium switch-icon">
                <span class="label">
                  <p class="inactive-label medium">
                    Non
                  </p>
                </span>
              </span>
            </div>
  
          </div>
        </mock:shadow-root>
  </ip-toggle>
    `);
  });
});
