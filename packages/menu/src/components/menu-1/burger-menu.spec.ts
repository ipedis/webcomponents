import { newSpecPage } from 'jest-stencil-runner';
import { IpBurgerMenu } from './burger-menu';

describe('ip-burger-menu', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [IpBurgerMenu],
      html: '<ip-burger-menu></ip-burger-menu>',
    });
    expect(root).toEqualHtml(`
            <ip-burger-menu>
                <mock:shadow-root>
                    <nav
        id="navigation"
        aria-label="Main Navigation"
        role="navigation"
        part="nav-bar"
      >
        <div class="head">
          <div class="logo"><slot name="left-head-content"></slot></div>
          <div class="right-head-content">
            <div class="button"><slot name="before-toggle-menu-content"></slot></div>
            <div class="toggle-burger-menu">
              <button
                part="toggle-menu-btn"
                aria-label="Open menu"
                aria-controls="burger-menu"
                aria-expanded="false"
                class="burger-menu-btn"
              >
                <img
                  class="svg-icon"
                  src="../../assets/images/icon-list.svg"
                  alt="Open menu"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
      </mock:shadow-root>
    </ip-burger-menu>
 `);
  });
});
