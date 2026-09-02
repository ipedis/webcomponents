/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'checkbox/components';

import { defineCustomElement as defineIpCheckbox } from 'checkbox/components/ip-checkbox.js';
import { defineCustomElement as defineIpCheckboxList } from 'checkbox/components/ip-checkbox-list.js';
@ProxyCmp({
  defineCustomElementFn: defineIpCheckbox,
  inputs: ['checked', 'disabled', 'identifier', 'name']
})
@Component({
  selector: 'ip-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'identifier', 'name'],
  outputs: ['checkboxChange'],
})
export class IpCheckbox {
  protected el: HTMLIpCheckboxElement;
  @Output() checkboxChange = new EventEmitter<IpCheckboxCustomEvent<{ name: string; checked: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { IpCheckboxCustomEvent } from 'checkbox/components';

export declare interface IpCheckbox extends Components.IpCheckbox {

  checkboxChange: EventEmitter<IpCheckboxCustomEvent<{ name: string; checked: boolean }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineIpCheckboxList,
  inputs: ['legend', 'options']
})
@Component({
  selector: 'ip-checkbox-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['legend', 'options'],
  outputs: ['selectionChanged'],
})
export class IpCheckboxList {
  protected el: HTMLIpCheckboxListElement;
  @Output() selectionChanged = new EventEmitter<IpCheckboxListCustomEvent<string[]>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { IpCheckboxListCustomEvent } from 'checkbox/components';

export declare interface IpCheckboxList extends Components.IpCheckboxList {

  selectionChanged: EventEmitter<IpCheckboxListCustomEvent<string[]>>;
}


