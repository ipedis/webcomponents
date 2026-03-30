import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as loginElements } from '@ipedis/login/loader';
import { DocLoginComponent } from '../doc-login/doc-login.component';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';

import { AccordionComponent } from '../../../features/accordion/accordion.component';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-login1',
  standalone: true,
  imports: [
    DocLoginComponent,
    CodeSnippetComponent,
    AccordionComponent,
    TranslocoPipe,
  ],
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Login1Component {
  private readonly translocoService = inject(TranslocoService);

  withEmailCode = `<ip-login 
    username-type="email"
    username-label="Email"
    username-error-msg="Email is required"
    username-required
  >
  <div class="social-media">
    <div class="text">
      <span>Or sign up using</span>
    </div>
    <div class="logo-list">
      <a
        class="twitter"
        href="https://design.ipedis.com/composants-web/champ-de-mot-de-passe/"
        target="_blank" rel="noopener noreferrer"
        aria-label="Sign up with twitter, new tab"
      >
        <img src="assets/images/twitter.svg" alt="Twitter" />
      </a>
      <a
        class="google"
        href="https://design.ipedis.com/composants-web/champ-de-mot-de-passe/"
        target="_blank" rel="noopener noreferrer"
        aria-label="Sign up with google, new tab"
      >
        <img src="assets/images/google.svg" alt="Google" />
      </a>
      <a
        class="facebook"
        href="https://design.ipedis.com/composants-web/champ-de-mot-de-passe/"
        target="_blank" rel="noopener noreferrer"
        aria-label="Sign up with facebook, new tab"
      >
        <img src="assets/images/facebook.svg" alt="Facebook" />
      </a>
    </div>
  </div>
  <div class="create-account">
    <span>Don't have an account ? </span>
    <a href="https://design.ipedis.com/composants-web/champ-de-mot-de-passe/">Create Account</a>
  </div>
</ip-login>

  `;
  cssCode = `.social-media {
    padding-top: 38px;
    padding-bottom: 80px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    .text {
      color: #384048;
      font-family: 'Mulish-light';
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      text-align: center;
    }
    .logo-list {
      display: flex;
      justify-content: center;
      .twitter,
      .google,
      .facebook {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        .icon {
          color: #fff;
          font-size: 20px;
        }

        &:focus,
        &:hover {
          outline: 3px solid hsl(221, 58%, 48%);
          outline-offset: 3px;
        }
      }
      .twitter {
        background-color: #4ca1ea;
        border-radius: 50%;
      }
      .google {
        background-color: #f44336;
        border-radius: 50%;
      }
      .facebook {
        background-color: #3b5998;
        border-radius: 50%;
      }
    }
  }

  .create-account {
    color: #384048;
    font-family: 'Mulish-light';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
  }`;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && loginElements) {
      loginElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
