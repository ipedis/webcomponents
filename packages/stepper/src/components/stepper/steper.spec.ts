import { newSpecPage } from 'jest-stencil-runner';
import { Stepper } from './stepper';

describe('ip-stepper', () => {
  it('renders and initializes with default values', async () => {
    const page = await newSpecPage({
      components: [Stepper],
      html: `<ip-stepper></ip-stepper>`,
    });

    expect(page.root).toEqualHtml(`
      <ip-stepper>
        <mock:shadow-root>
         <div class="stepper" role="region" aria-labelledby="stepper-heading">
  <div id="stepper-heading" class="step-indicator"><span>Step 1 / 0</span></div>
  <ol aria-label="Simulator progress" class="step-numbers"></ol>
  <div class="step-content" aria-live="polite"><slot></slot></div>
  <div class="controls single-button">
    <button class="continue-button" aria-label="Continue to the next step">
      Continue
    </button>
  </div>
</div>
        </mock:shadow-root>
      </ip-stepper>
    `);
  });

  it('shows the back button only when current step is greater than 0', async () => {
    const page = await newSpecPage({
      components: [Stepper],
      html: `<ip-stepper steps="3"></ip-stepper>`,
    });

    const component = page.root as HTMLElement;
    let backButton = component.shadowRoot.querySelector('.back-button');

    expect(backButton).toBeNull();

    const continueButton = component.shadowRoot.querySelector(
      '.continue-button',
    ) as HTMLButtonElement;
    continueButton.click();
    await page.waitForChanges();

    backButton = component.shadowRoot.querySelector('.back-button');
    expect(backButton).not.toBeNull();
  });

  it('does not show the back button on the first step', async () => {
    const page = await newSpecPage({
      components: [Stepper],
      html: `<ip-stepper steps="3"></ip-stepper>`,
    });

    const component = page.root as HTMLElement;
    const backButton = component.shadowRoot.querySelector('.back-button');

    expect(backButton).toBeNull();
  });
});
