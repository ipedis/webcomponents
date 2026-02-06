import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-login',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-login.component.html',
  styleUrl: './doc-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocLoginComponent {
  installationScript = `npm install ip-login`;

  import = `import '../node_modules/ip-login/dist/ip-login/ip-login.esm';`;

  custom = `ip-login {
  --primary-color: #006342;
  --secondary-color: #000000;
}

ip-login::part(title) {
  color: var(--primary-color);
}

ip-login::part(username-input) {
  width: 250px;
}
`;
  eventListener = `
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('ip-login');

  loginForm.addEventListener('formSubmitted', function (event) {
    console.log('Form submitted with:', event.detail);
  });
});
  `;
  example = `
<ip-login
  username-label="Username"
  password-label="Password"
  submit-button-label="Login"
  username-error-msg="Username is required"
  username-invalid-email-msg="The email address is invalid"
  password-length-error-msg="The password must contain at least 8 characters"
  password-uppercase-error-msg="Password must contain at least one capital"
  password-lowercase-error-msg="The password must contain at least a lower case"
  password-digit-error-msg="The password must contain at least one digit"
  username-type="email"
  show-password-aria-label="Show password"
  hide-password-aria-label="Hide password"
  username-required
  pwd-placeholder="Type your password here..."
  username-placeholder="Type your username here..."
  forgot-password-link="https://example.com/forgot-password"
  forgot-password-label="Forgot password?"
  login-title="Login"
  indication-label="Required fields"
>
</ip-login>
  `;
}
