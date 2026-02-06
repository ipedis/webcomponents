import { Component, h, Prop, State } from '@stencil/core';

export interface MenuItem {
  label: string;
  href?: string;
  submenus?: MenuItem[];
}

@Component({
  tag: 'ip-navigation-bar',
  styleUrl: 'navigation-bar.scss',
  shadow: true,
})
export class IpNavigationBar {
  @Prop({ mutable: true }) menuItems: MenuItem[] = [];
  @Prop() menuData = '[]';
  @Prop() openSubmenuPrefix = 'Open';
  @Prop() closeSubmenuPrefix = 'Close';
  @Prop() closeMenuAriaLabel = 'Close menu';
  @Prop() openMenuAriaLabel = 'Open menu';
  @Prop() pathToCloseIcon = '../../assets/images/close-icon.svg';
  @Prop() pathToOpenIcon = '../../assets/images/open-icon.svg';

  @State() openSubmenu: string | null = null;
  @State() isMenuOpen = false;

  componentWillLoad() {
    if (this.menuData) {
      try {
        const parsedMenu = JSON.parse(this.menuData);
        if (Array.isArray(parsedMenu)) {
          this.menuItems = parsedMenu;
        }
      } catch (error) {
        console.error('Invalid menuData JSON:', error);
      }
    }
  }

  _handleKeyDown(event: KeyboardEvent, item: MenuItem) {
    const target = event.target as HTMLElement;
    if (event.key === 'Tab') {
      this._handleTabNavigation(event, target, item);
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (item.submenus) {
        event.preventDefault();
        this.openSubmenu = this.openSubmenu === item.label ? null : item.label;
      }
    } else if (event.key === 'Escape') {
      this.openSubmenu = null;
    }
  }

  _handleTabNavigation(
    event: KeyboardEvent,
    target: HTMLElement,
    item: MenuItem,
  ) {
    if (this.openSubmenu === item.label) {
      const submenuItems = target
        .closest('li')
        ?.querySelectorAll('.submenu-item a');
      if (submenuItems) {
        const firstItem = submenuItems[0] as HTMLElement;
        const lastItem = submenuItems[submenuItems.length - 1] as HTMLElement;

        if (document.activeElement === lastItem && !event.shiftKey) {
          event.preventDefault();
          target.closest('li')?.nextElementSibling?.querySelector('a')?.focus();
          this.openSubmenu = null;
        } else if (document.activeElement === firstItem && event.shiftKey) {
          event.preventDefault();
          target
            .closest('li')
            ?.previousElementSibling?.querySelector('a')
            ?.focus();
          this.openSubmenu = null;
        }
      }
    }
  }
  _handleClickOutside(event: MouseEvent) {
    const menu = document.querySelector('ip-navigation-bar .right-content');
    if (menu && !menu.contains(event.target as Node)) {
      this.isMenuOpen = false;
    }
  }
  _toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.addEventListener('click', this._handleClickOutside.bind(this));
    } else {
      document.removeEventListener(
        'click',
        this._handleClickOutside.bind(this),
      );
    }
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleClickOutside.bind(this));
  }

  _handleFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    const submenuContainer = event.currentTarget as HTMLElement;

    if (!submenuContainer.contains(relatedTarget)) {
      this.openSubmenu = null;
    }
  }

  _renderSubmenu(submenus: MenuItem[]) {
    return (
      <ul
        class="sub-menu"
        part="submenu-items"
        onFocusout={(event) => this._handleFocusOut(event)}
      >
        {submenus.map((subitem) => (
          <li class="submenu-item" part="submenu-item" key={subitem.label}>
            <a class="submenu-item-link" href={subitem.href}>
              {subitem.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
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
              aria-label={
                this.isMenuOpen
                  ? this.closeMenuAriaLabel
                  : this.openMenuAriaLabel
              }
              aria-controls="burger-menu"
              aria-expanded={this.isMenuOpen ? 'true' : 'false'}
              class="burger-menu-btn"
              onClick={() => this._toggleMenu()}
            >
              <img
                class="svg-icon"
                src={
                  this.isMenuOpen ? this.pathToCloseIcon : this.pathToOpenIcon
                }
                alt={
                  this.isMenuOpen
                    ? this.closeMenuAriaLabel
                    : this.openMenuAriaLabel
                }
              />
            </button>
          </div>
        </div>

        <div class={`right-content ${this.isMenuOpen ? 'active' : ''}`}>
          <div class="elements">
            <ul
              class="menu"
              part="menu-items"
              onFocusout={(event) => this._handleFocusOut(event)}
            >
              {this.menuItems.map((item) => (
                <li part="menu-item" class="menu-items" key={item.label}>
                  {item.submenus ? (
                    <button
                      class="menu-item-btn"
                      onKeyDown={(event) => this._handleKeyDown(event, item)}
                      onClick={() =>
                        (this.openSubmenu =
                          this.openSubmenu === item.label ? null : item.label)
                      }
                      aria-expanded={
                        this.openSubmenu === item.label ? 'true' : 'false'
                      }
                      aria-controls={`submenu-${item.label}`}
                      aria-haspopup="true"
                      aria-label={
                        this.openSubmenu === item.label
                          ? `${this.closeSubmenuPrefix} ${item.label}`
                          : `${this.openSubmenuPrefix} ${item.label}`
                      }
                    >
                      <div class="menu-item-label">
                        <span>{item.label}</span>
                        <span class="icon">
                          <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            class={
                              this.openSubmenu === item.label ? 'rotate' : ''
                            }
                          >
                            <path
                              d="M13.0811 6.125L8.39355 10.8125L3.70605 6.125"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </button>
                  ) : (
                    <a
                      part="menu-items-link"
                      href={item.href}
                      onKeyDown={(event) => this._handleKeyDown(event, item)}
                    >
                      {item.label}
                    </a>
                  )}

                  {item.submenus && (
                    <div
                      id={`submenu-${item.label}`}
                      class="submenu-container"
                      part="submenu-container"
                      style={
                        this.openSubmenu === item.label
                          ? { display: 'block' }
                          : { display: 'none' }
                      }
                      aria-hidden={
                        this.openSubmenu === item.label ? 'false' : 'true'
                      }
                    >
                      {this._renderSubmenu(item.submenus)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <slot name="right-head"></slot>
        </div>
      </nav>
    );
  }
}
