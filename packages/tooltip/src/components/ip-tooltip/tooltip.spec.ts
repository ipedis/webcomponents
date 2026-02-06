import { newSpecPage } from 'jest-stencil-runner';
import { IpTooltip } from './tooltip';

describe('ip tooltip', () => {
  it('renders and shows content', async () => {
    const page = await newSpecPage({
      components: [IpTooltip],
      html: `
      <ip-tooltip  tooltip-trigger="Trigger Text" tooltip-content="tooltip-content"></ip-tooltip>
    `,
    });
    expect(page.root).toEqualHtml(`
      <ip-tooltip tooltip-trigger="Trigger Text" tooltip-content="tooltip-content" >
          <mock:shadow-root>
   <div class="tooltip-container">
      <button class="tooltip-trigger" part="tooltip-trigger" aria-describedby="desc-tooltip">
        Trigger Text
      </button>
      <div part="tooltip-content" class="tooltip-content hide" role="tooltip" id="desc-tooltip">
        <p>tooltip-content</p>
        <div class="btn-inside"></div>
      </div>
    </div>
          </mock:shadow-root>
      </ip-tooltip>
      `);
  });

  it('renders and shows title', async () => {
    const page = await newSpecPage({
      components: [IpTooltip],
      html: `
                <ip-tooltip tooltip-trigger="Trigger Text" tooltip-content="tooltip-content" tooltip-title="Title" type="click"></ip-tooltip>
            `,
    });
    expect(page.root).toEqualHtml(`
            <ip-tooltip tooltip-trigger="Trigger Text" tooltip-content="tooltip-content" tooltip-title="Title" type="click">
                <mock:shadow-root>
                    <div class="tooltip-container">
      <button class="tooltip-trigger" part="tooltip-trigger" aria-describedby="desc-tooltip">
        Trigger Text
      </button>
      <div part="tooltip-content" class="tooltip-content hide" role="tooltip" id="desc-tooltip">
        <h3 aria-label="Title" class="tooltip-title">Title</h3>
        <p>tooltip-content</p>
        <div class="btn-inside"></div>
      </div>
    </div>
                </mock:shadow-root>
            </ip-tooltip>
            `);
  });

  it('renders and shows close button', async () => {
    const page = await newSpecPage({
      components: [IpTooltip],
      html: `
                <ip-tooltip tooltip-trigger="Trigger Text" type="click" tooltip-content="tooltip-content" tooltip-title="Title" tooltip-btn-close="true"></ip-tooltip>
            `,
    });

    expect(page.root).toEqualHtml(`
            <ip-tooltip tooltip-trigger="Trigger Text" tooltip-content="tooltip-content" tooltip-title="Title" tooltip-btn-close="true" type="click">
                <mock:shadow-root>
                   <div class="tooltip-container">
      <button class="tooltip-trigger" part="tooltip-trigger" aria-describedby="desc-tooltip">
        Trigger Text
      </button>
      <div part="tooltip-content" class="tooltip-content hide" role="tooltip" id="desc-tooltip">
        <h3 aria-label="Title" class="tooltip-title">Title</h3>
        <button
        part="close-btn"
          class="close"
    
          aria-label="Close tooltip"
        >
          <span>x</span>
        </button>
        <p>tooltip-content</p>
        <div class="btn-inside"></div>
      </div>
    </div>
                </mock:shadow-root>
            </ip-tooltip>
    `);
  });

  it('renders and has two buttons', async () => {
    const page = await newSpecPage({
      components: [IpTooltip],
      html: `
            <ip-tooltip tooltip-trigger="Trigger Text" tooltip-content="tooltip-content" type="click" tooltip-title="Title" tooltip-btn-close="true" tooltip-btn-1="Cancel" tooltip-btn-2="Learn More"></ip-tooltip>
        `,
    });

    expect(page.root).toEqualHtml(`
    <ip-tooltip tooltip-btn-close="true" tooltip-btn-1="Cancel" tooltip-btn-2="Learn More" type="click" tooltip-content="tooltip-content" tooltip-title="Title" tooltip-trigger="Trigger Text">
        <mock:shadow-root>
              <div class="tooltip-container">
      <button class="tooltip-trigger" part="tooltip-trigger" aria-describedby="desc-tooltip">
        Trigger Text
      </button>
      <div class="tooltip-content hide" part="tooltip-content" role="tooltip" id="desc-tooltip">
        <h3 aria-label="Title" class="tooltip-title">Title</h3>
        <button
        part="close-btn"
          class="close"
          
          aria-label="Close tooltip"
        >
          <span>x</span>
        </button>
        <p>tooltip-content</p>
        <div class="btn-inside">
          <button part="tooltip-btn1" class="cancel" >Cancel</button
          ><button part="tooltip-btn2" class="learn-more" >
            Learn More
          </button>
        </div>
      </div>
    </div>
        </mock:shadow-root>
    </ip-tooltip>
    `);
  });
});
