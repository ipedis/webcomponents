/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from 'login/components';

import { defineCustomElement as defineIpEmail } from 'login/components/ip-email.js';
import { defineCustomElement as defineIpLogin } from 'login/components/ip-login.js';
import { defineCustomElement as defineIpPassword } from 'login/components/ip-password.js';
@ProxyCmp({
  defineCustomElementFn: defineIpEmail,
  inputs: ['emptyFieldErrorMessage', 'errorMessage', 'inputLabel', 'inputPlaceholder', 'invalid', 'required']
})
@Component({
  selector: 'ip-email',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['emptyFieldErrorMessage', 'errorMessage', 'inputLabel', 'inputPlaceholder', 'invalid', 'required'],
  outputs: ['inputChange'],
})
export class IpEmail {
  protected el: HTMLIpEmailElement;
  @Output() inputChange = new EventEmitter<IpEmailCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['inputChange']);
  }
}


import type { IpEmailCustomEvent } from 'login/components';

export declare interface IpEmail extends Components.IpEmail {

  inputChange: EventEmitter<IpEmailCustomEvent<string>>;
}


@ProxyCmp({
  defineCustomElementFn: defineIpLogin,
  inputs: ['forgotPasswordLabel', 'forgotPasswordLink', 'hidePasswordAriaLabel', 'indicationLabel', 'loginTitle', 'passwordDigitErrorMsg', 'passwordLabel', 'passwordLengthErrorMsg', 'passwordLowercaseErrorMsg', 'passwordUppercaseErrorMsg', 'pwdPlaceholder', 'showPasswordAriaLabel', 'submitBtnAriaLabel', 'submitButtonLabel', 'usernameErrorMsg', 'usernameInvalidEmailMsg', 'usernameLabel', 'usernamePlaceholder', 'usernameRequired', 'usernameType']
})
@Component({
  selector: 'ip-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['forgotPasswordLabel', 'forgotPasswordLink', 'hidePasswordAriaLabel', 'indicationLabel', 'loginTitle', 'passwordDigitErrorMsg', 'passwordLabel', 'passwordLengthErrorMsg', 'passwordLowercaseErrorMsg', 'passwordUppercaseErrorMsg', 'pwdPlaceholder', 'showPasswordAriaLabel', 'submitBtnAriaLabel', 'submitButtonLabel', 'usernameErrorMsg', 'usernameInvalidEmailMsg', 'usernameLabel', 'usernamePlaceholder', 'usernameRequired', 'usernameType'],
  outputs: ['formSubmitted'],
})
export class IpLogin {
  protected el: HTMLIpLoginElement;
  @Output() formSubmitted = new EventEmitter<IpLoginCustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['formSubmitted']);
  }
}


import type { IpLoginCustomEvent } from 'login/components';

export declare interface IpLogin extends Components.IpLogin {

  formSubmitted: EventEmitter<IpLoginCustomEvent<any>>;
}


@ProxyCmp({
  defineCustomElementFn: defineIpPassword,
  inputs: ['emptyFieldErrorMessage', 'errorMessage', 'forgotPasswordLink', 'hidePasswordAriaLabel', 'inputPlaceholder', 'invalid', 'showPasswordAriaLabel']
})
@Component({
  selector: 'ip-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['emptyFieldErrorMessage', 'errorMessage', 'forgotPasswordLink', 'hidePasswordAriaLabel', 'inputPlaceholder', 'invalid', 'showPasswordAriaLabel'],
  outputs: ['passwordChange'],
})
export class IpPassword {
  protected el: HTMLIpPasswordElement;
  @Output() passwordChange = new EventEmitter<IpPasswordCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['passwordChange']);
  }
}


import type { IpPasswordCustomEvent } from 'login/components';

export declare interface IpPassword extends Components.IpPassword {

  passwordChange: EventEmitter<IpPasswordCustomEvent<string>>;
}

