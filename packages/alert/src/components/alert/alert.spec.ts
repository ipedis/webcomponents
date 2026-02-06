jest.mock('./icon/info-icon.svg', () => 'info-icon.svg');
jest.mock('./icon/warning-icon.svg', () => 'warning-icon.svg');
jest.mock('./icon/danger-icon.svg', () => 'danger-icon.svg');
jest.mock('./icon/success-icon.svg', () => 'success-icon.svg');

import { newSpecPage } from 'jest-stencil-runner';
import { Alert } from './alert';

describe('ip-alert', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [Alert],
      html: '<ip-alert></ip-alert>',
    });
    expect(root).toEqualHtml(`
            <ip-alert>
                <mock:shadow-root>
<div class="alert alert-info" role="alert">
  <div class="icon" aria-hidden="true">
<img alt="Info Icon"  src="info-icon.svg">
  </div>
  <button class="close-button" aria-label="Close alert" 
   >×</button>
  <div class="message-content"><div class="message"></div></div>
</div>
                </mock:shadow-root>
            </ip-alert>
        `);
  });
  it('should render with the correct title and message', async () => {
    const { root } = await newSpecPage({
      components: [Alert],
      html: '<ip-alert alert-title="Test Title" message="Test Message"></ip-alert>',
    });
    expect(root).toEqualHtml(`
            <ip-alert alert-title="Test Title" message="Test Message">
                <mock:shadow-root>
                <div class="alert alert-info" role="alert">
  <div class="icon" aria-hidden="true">
<img alt="Info Icon"  src="info-icon.svg">
  </div>
  <button class="close-button" aria-label="Close alert" 
  >×</button>
  <div class="message-content">
    <div class="title title-info">Test Title</div>
    <div class="message">Test Message</div>
  </div>
</div>
      </mock:shadow-root>
</ip-alert>
    `);
  });
});
