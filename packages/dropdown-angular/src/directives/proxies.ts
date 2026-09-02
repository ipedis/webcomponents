/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'dropdown/components';

import { defineCustomElement as defineIpDropdown } from 'dropdown/components/ip-dropdown.js';
@ProxyCmp({
  defineCustomElementFn: defineIpDropdown,
  inputs: ['dropdownTitle', 'itemsOptions', 'placeholder']
})
@Component({
  selector: 'ip-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['dropdownTitle', 'itemsOptions', 'placeholder'],
  outputs: ['itemSelected'],
})
export class IpDropdown {
  protected el: HTMLIpDropdownElement;
  @Output() itemSelected = new EventEmitter<IpDropdownCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { IpDropdownCustomEvent } from 'dropdown/components';

export declare interface IpDropdown extends Components.IpDropdown {

  itemSelected: EventEmitter<IpDropdownCustomEvent<string>>;
}


