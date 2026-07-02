import {
  Component,
  h,
  Element,
  Prop,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'ip-email',
  styleUrl: 'ip-email.scss',
  formAssociated: true,
  shadow: true,
})
export class IpEmail {
  @Element() el: HTMLElement;
  @Prop() errorMessage: string;
  @Prop({ mutable: true }) invalid = false;
  @Prop() inputLabel = 'Email';
  @Prop() emptyFieldErrorMessage = 'Email field cannot be empty';
  @Prop({ reflect: true, mutable: true }) required = false;
  @Prop() inputPlaceholder = 'Type your email here...';

  @State() value = '';

  @Event({ eventName: 'inputChange' }) inputChange: EventEmitter<string>;

  _handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.inputChange.emit(this.value);
  };

  validate() {
    if (this.value.trim() === '') {
      this.invalid = true;
      this.errorMessage = this.emptyFieldErrorMessage;
      return false;
    } else {
      const inputElement = this.el.shadowRoot.querySelector('input');
      this.invalid = !inputElement.checkValidity();
      this.errorMessage = this.invalid ? this.errorMessage : '';
      return !this.invalid;
    }
  }

  render() {
    const inputClasses = {
      input__input: true,
      'input__input--invalid': this.invalid,
    };
    return (
      <div class="input">
        <label htmlFor="email" part="input-label" class="input__label">
          {this.inputLabel}
          {this.required && (
            <span aria-hidden="true" class="required-asterisk">
              *
            </span>
          )}
        </label>
        <div class="input_btn">
          <input
            part="email-input"
            type="string"
            id="email"
            class={inputClasses}
            autoComplete="email"
            required={this.required}
            placeholder={this.inputPlaceholder}
            aria-invalid={this.invalid ? 'true' : null}
            aria-describedby={this.invalid ? 'password-error' : null}
            onInput={(event) => this._handleInput(event)}
            value={this.value}
          />
        </div>

        {this.invalid && (
          <p
            part="error-message"
            id={`${this.inputLabel}-error`}
            class="input__error"
          >
            {this.errorMessage}
          </p>
        )}
      </div>
    );
  }
}
