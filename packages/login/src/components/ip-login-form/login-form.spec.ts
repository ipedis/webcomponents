import { newSpecPage } from 'jest-stencil-runner';
import { LoginForm } from './login-form';

describe('ip-login', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LoginForm],
      html: '<ip-login></ip-login>',
    });

    expect(page.root).toEqualHtml(`
      <ip-login>
        <mock:shadow-root>
          <div class="login">
            <div class="title" part="title">
              <p>Login</p>
            </div>
            <div class="indication" part="indication">
              <span>
                <span class="asterisk">*</span>
                Required fields
              </span>
            </div>
            <form part="login-form">
              <div class="input">
                <label for="username" class="input__label" part="username-label">
                  Username
                </label>
                <div class="input_btn">
                  <input  autocomplete="username" part="username-input" class="input__input" type="text" id="username" name="username" value="" placeholder="Type your username here...">
                </div>
              </div>
              <div class="input">
                <label class="input__label" for="password" part="password-label">
                  Password
                  <span aria-hidden="true" class="required-asterisk">*</span>
                </label>
                <div class="input_btn">
                  <input autocomplete="current-password" part="password-input" class="input__input" type="password"  id="password" name="password" value="" placeholder="Type your password here...">
                  <button part="toggle-password" type="button" class="toggle-password" aria-label="Show password">
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M5.33262 2.99341C5.23383 2.88204 5.11391 2.79139 4.97982 2.72671C4.84574 2.66204 4.70014 2.62461 4.55149 2.61661C4.40283 2.60862 4.25406 2.6302 4.11381 2.68013C3.97356 2.73005 3.84461 2.80731 3.73444 2.90743C3.62426 3.00755 3.53506 3.12855 3.47199 3.2634C3.40892 3.39826 3.37325 3.54429 3.36703 3.69303C3.36082 3.84177 3.38419 3.99027 3.43579 4.12991C3.48738 4.26956 3.56619 4.39757 3.66762 4.50653L5.16762 6.16122C1.93794 8.31185 0.536374 11.3981 0.468874 11.5434C0.405361 11.6874 0.372559 11.8431 0.372559 12.0004C0.372559 12.1578 0.405361 12.3135 0.468874 12.4575C0.503561 12.5343 1.32481 14.3568 3.13981 16.1709C5.56606 18.5943 8.62512 19.875 12.0001 19.875C13.6404 19.8841 15.266 19.5653 16.7814 18.9375L18.6648 21.0093C18.8665 21.226 19.1455 21.3545 19.4413 21.3668C19.7371 21.3792 20.0258 21.2745 20.2449 21.0754C20.4639 20.8763 20.5957 20.5988 20.6116 20.3032C20.6275 20.0076 20.5263 19.7177 20.3298 19.4962L5.33262 2.99341ZM12.0001 17.625C9.22606 17.625 6.79981 16.619 4.78981 14.6362C3.99917 13.8534 3.31886 12.9665 2.76762 12C3.26169 11.1272 4.52919 9.19685 6.70512 7.84778L15.1511 17.1393C14.1325 17.4646 13.0693 17.6284 12.0001 17.625ZM23.5314 12.4575C23.4976 12.5334 22.6876 14.3325 20.9064 16.1287C20.8044 16.2419 20.6804 16.3333 20.5421 16.3971C20.4037 16.461 20.2538 16.4961 20.1015 16.5003C19.9492 16.5045 19.7976 16.4777 19.6559 16.4215C19.5142 16.3654 19.3855 16.281 19.2774 16.1736C19.1693 16.0661 19.0842 15.9379 19.0272 15.7965C18.9702 15.6552 18.9425 15.5038 18.9458 15.3514C18.9491 15.199 18.9833 15.049 19.0464 14.9102C19.1094 14.7715 19.2 14.647 19.3126 14.5443C20.0609 13.7836 20.7063 12.9282 21.2326 12C20.6817 11.0333 20.0014 10.1463 19.2104 9.36372C17.1995 7.38091 14.7742 6.37497 12.0001 6.37497C11.6861 6.37497 11.372 6.3881 11.0626 6.41435C10.9135 6.43032 10.7628 6.41633 10.6192 6.37319C10.4756 6.33006 10.342 6.25866 10.2264 6.16318C10.1108 6.0677 10.0154 5.95007 9.94594 5.81721C9.87644 5.68435 9.8342 5.53894 9.8217 5.38952C9.8092 5.24011 9.8267 5.0897 9.87316 4.94714C9.91963 4.80458 9.99412 4.67274 10.0923 4.55938C10.1904 4.44603 10.3102 4.35343 10.4447 4.28704C10.5791 4.22065 10.7255 4.1818 10.8751 4.17278C11.2436 4.14091 11.6251 4.12497 12.0001 4.12497C15.3751 4.12497 18.4342 5.40653 20.8586 7.82997C22.6726 9.64403 23.4939 11.4675 23.5286 11.5434C23.5925 11.6872 23.6258 11.8428 23.6263 12.0001C23.6268 12.1575 23.5944 12.3133 23.5314 12.4575Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="submit-btn">
                <button part="submit-btn" aria-label="Submit the form" class="submit" type="submit">
                  Login
                </button>
              </div>
            </form>
            <div class="other">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </ip-login>
    `);
  });
});
