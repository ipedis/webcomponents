import { newSpecPage } from '@stencil/core/testing';
import { IpNavigationBar } from './navigation-bar';

describe('ip-navigation-bar', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [IpNavigationBar],
      html: '<ip-navigation-bar menu-data=\'[{"label": "Home", "href": "/"},{"label": "Services", "href": "/services", "submenus": [{"label": "Web Design", "href": "/services/web-design"},{"label": "SEO", "href": "/services/seo"}]},{"label": "Contact", "href": "/contact"}]\'></ip-navigation-bar>',
    });
    expect(root).toEqualHtml(`
        
        <ip-navigation-bar menu-data='[{"label": "Home", "href": "/"},{"label": "Services", "href": "/services", "submenus": [{"label": "Web Design", "href": "/services/web-design"},{"label": "SEO", "href": "/services/seo"}]},{"label": "Contact", "href": "/contact"}]'>
          <mock:shadow-root>
             <nav
      id="navigation"
      role="navigation"
      aria-label="Main navigation"
      part="nav-bar"
    >
      <div class="left-content">
        <slot name="left-head"></slot>
        <div class="toggle-menu-btn">
          <button
            part="toggle-menu-btn"
            aria-label="Open menu"
            aria-controls="burger-menu"
            aria-expanded="false"
            class="burger-menu-btn"
          >
            <img
              class="svg-icon"
              src="../../assets/images/open-icon.svg"
              alt="Open menu"
            />
          </button>
        </div>
      </div>
      <div class="right-content">
        <div class="elements">
          <ul class="menu" part="menu-items">
            <li part="menu-item" class="menu-items">
              <a part="menu-items-link" href="/">Home</a>
            </li>
            <li part="menu-item" class="menu-items">
              <button
                class="menu-item-btn"
                aria-expanded="false"
                aria-controls="submenu-Services"
                aria-haspopup="true"
                aria-label="Open Services"
              >
                <div class="menu-item-label">
                  <span>Services</span
                  ><span class="icon"
                    ><svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M13.0811 6.125L8.39355 10.8125L3.70605 6.125"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path></svg
                  ></span>
                </div>
              </button>
               <div aria-hidden="true" class="submenu-container" id="submenu-Services" part="submenu-container" style="display: none;">
                 <ul class="sub-menu" part="submenu-items">
                   <li class="submenu-item" part="submenu-item">
                     <a class="submenu-item-link" href="/services/web-design">
                       Web Design
                     </a>
                   </li>
                   <li class="submenu-item" part="submenu-item">
                     <a class="submenu-item-link" href="/services/seo">
                       SEO
                     </a>
                   </li>
                 </ul>
               </div>
            </li>
            <li part="menu-item" class="menu-items">
              <a part="menu-items-link" href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <slot name="right-head"></slot>
      </div>
    </nav>
          </mock:shadow-root>
          </ip-navigation-bar>`);
  });
});
