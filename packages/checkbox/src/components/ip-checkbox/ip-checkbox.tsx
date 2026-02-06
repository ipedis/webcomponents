import {
  Component,
  h,
  Element,
  Prop,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'ip-checkbox',
  styleUrl: 'ip-checkbox.scss',
  shadow: true,
})
export class IpCheckbox {
  @Element() hostElement: HTMLElement;

  @Prop() identifier: string;
  @Prop() disabled = false;
  @Prop({ mutable: true }) checked = false;
  @Prop() name: string;

  @Event() checkboxChange: EventEmitter<{ name: string; checked: boolean }>;

  handleChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.checked = checkbox.checked;
    this.checkboxChange.emit({ name: this.name, checked: this.checked });
  }

  render() {
    return (
      <div class="checkbox-content">
        <label htmlFor={this.identifier} class="checkbox-label">
          <input
            id={this.identifier}
            name={this.name}
            class="checkbox-input"
            type="checkbox"
            {...(this.checked ? { defaultChecked: true } : {})}
            disabled={this.disabled}
            onChange={(event) => this.handleChange(event)}
          />
          <slot></slot>
        </label>
      </div>
    );
  }
}
