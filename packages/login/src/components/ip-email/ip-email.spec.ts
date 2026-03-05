import { newSpecPage } from 'jest-stencil-runner';
import { IpEmail } from './ip-email';

describe('ip-email', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [IpEmail],
      html: '<ip-email required></ip-email>',
    });
    expect(root).toEqualHtml(`
            <ip-email required>
                <mock:shadow-root>
                    <div class="input">
                        <label for="email" class="input__label" part="input-label" >
                            Email
                            <span aria-hidden="true" class="required-asterisk">
                                *
                            </span>
                        </label>
                        <div class="input_btn">
                            <input part="email-input" type="string" id="email" class="input__input" autocomplete="email" required value="" placeholder="Type your email here...">
                        </div>
                    </div>
                </mock:shadow-root>
            </ip-email>
        `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [IpEmail],
      html: `<ip-email input-label="Username"></ip-email>`,
    });
    expect(root).toEqualHtml(`
                <ip-email input-label="Username">
                    <mock:shadow-root>
                        <div class="input">
                            <label for="email" class="input__label" part="input-label">
                            Username
                            </label>
                            <div class="input_btn">
                                <input type="string" part="email-input" id="email" class="input__input" autocomplete="email" value="" placeholder="Type your email here...">
                            </div>
                        </div>
                    </mock:shadow-root>
                </ip-email>
            `);
  });
});
