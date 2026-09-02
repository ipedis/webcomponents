/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'toggle/components';

import { defineCustomElement as defineIpToggle } from 'toggle/components/ip-toggle.js';
@ProxyCmp({
  defineCustomElementFn: defineIpToggle,
  inputs: ['activeLabel', 'ariaLabel', 'checked', 'inactiveLabel', 'size', 'toggleDisabled']
})
@Component({
  selector: 'ip-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeLabel', 'ariaLabel', 'checked', 'inactiveLabel', 'size', 'toggleDisabled'],
  outputs: ['toggleChange'],
})
export class IpToggle {
  protected el: HTMLIpToggleElement;
  @Output() toggleChange = new EventEmitter<IpToggleCustomEvent<boolean>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { IpToggleCustomEvent } from 'toggle/components';

export declare interface IpToggle extends Components.IpToggle {

  toggleChange: EventEmitter<IpToggleCustomEvent<boolean>>;
}


