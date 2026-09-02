/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'tooltip/components';

import { defineCustomElement as defineIpTooltip } from 'tooltip/components/ip-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineIpTooltip,
  inputs: ['btn1AriaLabel', 'btn2AriaLabel', 'tooltipBtn1', 'tooltipBtn2', 'tooltipBtnClose', 'tooltipContent', 'tooltipTitle', 'tooltipTrigger', 'type']
})
@Component({
  selector: 'ip-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['btn1AriaLabel', 'btn2AriaLabel', 'tooltipBtn1', 'tooltipBtn2', 'tooltipBtnClose', 'tooltipContent', 'tooltipTitle', 'tooltipTrigger', 'type'],
  outputs: ['btn1Click', 'btn2Click'],
})
export class IpTooltip {
  protected el: HTMLIpTooltipElement;
  @Output() btn1Click = new EventEmitter<IpTooltipCustomEvent<any>>();
  @Output() btn2Click = new EventEmitter<IpTooltipCustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { IpTooltipCustomEvent } from 'tooltip/components';

export declare interface IpTooltip extends Components.IpTooltip {

  btn1Click: EventEmitter<IpTooltipCustomEvent<any>>;

  btn2Click: EventEmitter<IpTooltipCustomEvent<any>>;
}


