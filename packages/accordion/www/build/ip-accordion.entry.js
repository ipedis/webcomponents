import { r as registerInstance, h, a as getAssetPath, d as getElement } from './index-DqDpLOHq.js';

const accordionCss = () => `:host{--ip-acc-primary-color:#b00057;--ip-acc-secondary-color:#2e3243;--ip-acc-font:"Avenir", sans-serif;--ip-acc-icon-size:30px}.ip-accordion{font-family:var(--ip-acc-font);font-weight:400;counter-reset:list}.ip-acc-panel{border-radius:4px;box-shadow:0 0 6px 0 rgba(0, 0, 0, 0.2);margin-block-end:20px;overflow:hidden;counter-increment:list}.ip-acc-panel:last-child{margin-block-end:0}.js-panel{display:none;opacity:0;transition:opacity 0.3s ease-in}.visible{height:auto;display:block;opacity:1}.hidden{display:none;opacity:0}.js-acc-button{margin-block:0;margin-inline:0;font-weight:500}.js-acc-button button{all:unset;font:inherit;display:flex;align-items:center;border-radius:inherit;position:relative;font-size:1.125rem;color:var(--ip-acc-primary-color);background-color:#ffffff;margin:0;inline-size:100%;block-size:100%;padding-inline:1.333em;padding-block:1em;box-sizing:border-box;transition:background-color 0.3s ease-in-out, color 0.3s ease-in-out;cursor:pointer}.js-acc-button button:has(.accordion-icon+.accordion-title){display:flex;align-items:center;gap:10px}.js-acc-button button::before{content:"";position:absolute;inset-block:50%;inset-inline-end:0;margin:auto;inline-size:1em;block-size:0.5em;background-color:currentColor;clip-path:polygon(50% 100%, 100% 0%, 85% 0%, 50% 75%, 15% 0%, 0% 0%);transform:translateX(-1.333em);transform-origin:center;pointer-events:none;transition:clip-path 0.3s ease-in-out}.js-acc-button button .accordion-icon{block-size:var(--ip-acc-icon-size);inline-size:var(--ip-acc-icon-size);aspect-ratio:1/1}.js-acc-button button .accordion-title{position:relative;font-size:inherit;font-weight:700;color:var(--ip-acc-secondary-color)}.js-acc-button button .accordion-title::before{content:"0" counter(list) ".";position:relative;color:var(--ip-acc-primary-color);font:inherit;margin-inline-end:0.625em}.js-acc-button button[aria-expanded=true]{background-color:var(--ip-acc-primary-color);color:#ffffff;transition:background-color 0.3s ease-in-out, color 0.3s ease-in-out}.js-acc-button button[aria-expanded=true]::before{clip-path:polygon(50% 0%, 100% 100%, 85% 100%, 50% 25%, 15% 100%, 0% 100%)}.js-acc-button button[aria-expanded=true] .accordion-title{color:currentColor}.js-acc-button button[aria-expanded=true] .accordion-title::before{color:currentColor}.js-acc-button button:focus{outline:2px solid blue;outline-offset:-3px}.js-panel{place-items:center;opacity:1;overflow:hidden;transition:all 0.3s ease-in}.acc-content{display:flex;gap:45px;padding:45px}.acc-content__image{flex-basis:50%;border-radius:10px;inline-size:auto;block-size:100%;max-inline-size:50%;max-block-size:100%}.acc-content__desc-wrapper{flex-basis:auto}.acc-content__title{color:var(--ip-acc-primary-color);font-size:18px;line-height:25px;font-weight:700;margin-block-end:0.63em}.acc-content__title:last-child{margin-block-end:0}.acc-content__desc{font-size:18px;font-weight:300;color:var(--ip-acc-secondary-color);margin-block-end:2em}.acc-content__desc:last-child{margin-block-end:0}.acc-content__btn{all:unset;display:inline-block;color:var(--ip-acc-primary-color);padding-inline:25px;padding-block:10px;background-color:transparent;border:1px solid currentColor;border-radius:4px;box-sizing:border-box;cursor:pointer;transition:all 0.3s ease-in-out}.acc-content__btn:hover{background-color:var(--ip-acc-primary-color);color:#ffffff}@media only screen and (max-width: 767px) and (orientation: portrait), only screen and (max-width: 992px) and (orientation: landscape){.acc-content{flex-direction:column;padding:20px;gap:30px}.acc-content__image{max-inline-size:100%}}`;

const Ipaccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.titleTag = 'h2';
    }
    arrayDataWatcher(newValue) {
        if (typeof newValue === 'string') {
            this._accordionHeaders = JSON.parse(newValue);
        }
        else {
            this._accordionHeaders = newValue;
        }
    }
    componentWillLoad() {
        this.arrayDataWatcher(this.accordionHeaders);
        requestAnimationFrame(() => {
            this.accHeaderButtons = this.el.shadowRoot
                .querySelector('#ip-accordion')
                .querySelectorAll('button');
            this.accPanels = this.el.shadowRoot
                .querySelector('#ip-accordion')
                .querySelectorAll('.js-panel');
            this.setSlotId();
            this.hidePanels();
            this.openFirstPanel();
        });
    }
    openFirstPanel() {
        if (this.isFirstPanelOpen) {
            const firstPanel = this.accPanels[0];
            const firstButton = this.accHeaderButtons[0];
            firstPanel.classList.remove('hidden');
            firstPanel.classList.add('visible');
            firstButton.setAttribute('aria-expanded', 'true');
            this.currentPanel = 'panel-1';
        }
    }
    // For accessibility - set an id on the slotted elements
    setSlotId() {
        const slottedElems = this.el.querySelectorAll('ip-accordion > [slot]');
        slottedElems.forEach((slotElem, index) => {
            var _a;
            slotElem.setAttribute('id', (_a = this._accordionHeaders[index]) === null || _a === void 0 ? void 0 : _a.ariaText);
        });
    }
    onSelectPanel(index, panel) {
        const selectedButton = this.accHeaderButtons[index];
        const selectedPanel = this.accPanels[index];
        if (selectedButton.getAttributeNode('aria-expanded').value === 'false') {
            this.currentPanel = panel;
        }
        else {
            this.currentPanel = '';
        }
        this.setAriaExpanded(selectedButton);
        if (this.isSingleOpen) {
            this.closeOtherPanels(index);
        }
        this.setHeight(selectedPanel);
    }
    closeOtherPanels(selectedIndex) {
        this.accPanels.forEach((panel, index) => {
            if (index !== selectedIndex) {
                panel.classList.remove('visible');
                panel.classList.add('hidden');
                this.accHeaderButtons[index].setAttribute('aria-expanded', 'false');
            }
        });
    }
    isOpen(selectedButton) {
        if (this.isSingleOpen) {
            this.accPanels.forEach((panel) => {
                panel.style.height = 'auto';
            });
            this.accHeaderButtons.forEach((accButton) => {
                if (selectedButton === accButton &&
                    selectedButton.getAttributeNode('aria-expanded').value === 'true') {
                    selectedButton.setAttribute('aria-expanded', 'true');
                }
                else {
                    accButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    setHeight(selectedPanel) {
        if (selectedPanel.classList.contains('hidden')) {
            selectedPanel.classList.remove('hidden');
            selectedPanel.classList.add('visible');
        }
        else {
            selectedPanel.classList.remove('visible');
            selectedPanel.classList.add('hidden');
        }
    }
    // set aria-expanded to true for selected button
    setAriaExpanded(selectedButton) {
        if (selectedButton.getAttributeNode('aria-expanded').value === 'true') {
            selectedButton.setAttribute('aria-expanded', 'false');
        }
        else {
            selectedButton.setAttribute('aria-expanded', 'true');
        }
    }
    // For accessibility - so as not to make elements inside tabulable
    hidePanels() {
        this.accPanels.forEach((panel) => {
            panel.classList.add('hidden');
        });
    }
    render() {
        return [
            h("div", { key: 'a19bdbdddf9b996fc4dcacf00b3e97f14c92413d', part: "ip-accordion", class: "ip-accordion", id: "ip-accordion" }, this._accordionHeaders ? (this._accordionHeaders.map((tabHeader, index) => (h("div", { part: `acc-panel acc-panel-${index + 1}`, class: "ip-acc-panel" }, tabHeader.title ? (tabHeader.iconPath ? (h(this.titleTag, { part: "acc-header", class: "js-acc-button" }, h("button", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-btn acc-btn-active'
                    : 'acc-btn', onClick: this.onSelectPanel.bind(this, index, 'panel-' + (index + 1)), "aria-label": this.currentPanel === 'panel-' + (index + 1)
                    ? tabHeader.btnAltClose
                        ? tabHeader.btnAltClose
                        : null
                    : tabHeader.btnAlt
                        ? tabHeader.btnAlt
                        : null, type: "button", "aria-expanded": this.isFirstPanelOpen && index === 0 ? 'true' : 'false', "aria-controls": tabHeader.ariaText, id: tabHeader.id, class: this.isFirstPanelOpen && index === 0 ? 'visible' : '' }, h("img", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-icon acc-icon-active'
                    : 'acc-icon', class: "accordion-icon", src: this.currentPanel === 'panel-' + (index + 1)
                    ? tabHeader.iconActivePath
                    : tabHeader.iconPath, alt: "" }), h("span", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-title acc-title-active'
                    : 'acc-title', class: "accordion-title" }, tabHeader.title), tabHeader.subtitle ? (h("span", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-subtitle acc-subtitle-active'
                    : 'acc-subtitle', class: "accordion-subtitle" }, tabHeader.subtitle)) : null))) : (h(this.titleTag, { part: "acc-header", class: "js-acc-button" }, h("button", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-btn acc-btn-active'
                    : 'acc-btn', onClick: this.onSelectPanel.bind(this, index, 'panel-' + (index + 1)), "aria-label": this.currentPanel === 'panel-' + (index + 1)
                    ? tabHeader.btnAltClose
                        ? tabHeader.btnAltClose
                        : null
                    : tabHeader.btnAlt
                        ? tabHeader.btnAlt
                        : null, "aria-expanded": this.isFirstPanelOpen && index === 0 ? 'true' : 'false', "aria-controls": tabHeader.ariaText, id: tabHeader.id, class: this.isFirstPanelOpen && index === 0 ? 'visible' : '' }, h("span", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-title acc-title-active'
                    : 'acc-title', class: "accordion-title" }, tabHeader.title), tabHeader.subtitle ? (h("span", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-subtitle acc-subtitle-active'
                    : 'acc-subtitle', class: "accordion-subtitle" }, tabHeader.subtitle)) : null)))) : (h("div", { part: "acc-header", class: "js-acc-button" }, h("button", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-btn acc-btn-active'
                    : 'acc-btn', onClick: this.onSelectPanel.bind(this, index, 'panel-' + (index + 1)), "aria-label": this.currentPanel === 'panel-' + (index + 1)
                    ? tabHeader.btnAltClose
                        ? tabHeader.btnAltClose
                        : null
                    : tabHeader.btnAlt
                        ? tabHeader.btnAlt
                        : null, "aria-expanded": this.isFirstPanelOpen && index === 0 ? 'true' : 'false', "aria-controls": tabHeader.ariaText, id: tabHeader.id, class: this.isFirstPanelOpen && index === 0 ? 'visible' : '' }, h("img", { part: this.currentPanel === 'panel-' + (index + 1)
                    ? 'acc-icon acc-icon-active'
                    : 'acc-icon', class: "accordion-icon", src: this.currentPanel === 'panel-' + (index + 1)
                    ? tabHeader.iconActivePath
                    : tabHeader.iconPath, alt: "" })))), h("div", { part: "acc-content", id: tabHeader.ariaText, class: `js-panel ${this.isFirstPanelOpen && index === 0 ? 'visible' : 'hidden'}` }, h("slot", { name: 'accordion-' + (index + 1) })))))) : (h("div", { part: "acc-panel acc-panel-1", class: "ip-acc-panel" }, h("h2", { part: "acc-header", class: "js-acc-button" }, h("button", { part: this.currentPanel === 'panel-' + 1
                    ? 'acc-btn acc-btn-active'
                    : 'acc-btn', onClick: this.onSelectPanel.bind(this, 0), "aria-label": "Afficher plus d'information sur {nom de la section}", "aria-expanded": this.isFirstPanelOpen ? 'true' : 'false', "aria-controls": "sect-1", id: "accordion-1", class: this.isFirstPanelOpen ? 'visible' : '' }, h("span", { part: this.currentPanel === 'panel-' + 1
                    ? 'acc-title acc-title-active'
                    : 'acc-title', class: "accordion-title" }, "Accessibilit\u00E9"))), h("div", { part: "acc-content", id: "sect-1", class: `js-panel ${this.isFirstPanelOpen ? 'visible' : 'hidden'}` }, h("div", { class: "acc-content" }, h("img", { class: "acc-content__image", src: getAssetPath('assets/images/tab-img-1.png'), alt: "" }), h("div", { class: "acc-content__desc-wrapper" }, h("h4", { class: "acc-content__title" }, "6 Bonnes Pratiques pour \u00EAtre en Conformit\u00E9"), h("p", { class: "acc-content__desc" }, "Aujourd'hui, encore beaucoup de sites Web et d'applications mobiles sont con\u00E7us sans penser \u00E0 la navigation des personnes en situation de handicap. Pourtant, pour ces personnes, l'outil digital repr\u00E9sente un v\u00E9ritable levier d'int\u00E9gration, et leur apporte bien souvent un surcro\u00EEt d'ind\u00E9pendance. Selon les diff\u00E9rents types de handicaps, les manquements les plus couramment relev\u00E9s sur le Web ne sont pas les m\u00EAmes."), h("a", { class: "acc-content__btn", "aria-label": "En savoir plus, 6 Bonnes Pratiques pour \u00EAtre en Conformit\u00E9", href: "#" }, "En\u00A0savoir\u00A0plus"))))))),
        ];
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "accordionHeaders": [{
                "arrayDataWatcher": 0
            }]
    }; }
};
Ipaccordion.style = accordionCss();

export { Ipaccordion as ip_accordion };
//# sourceMappingURL=ip-accordion.entry.esm.js.map

//# sourceMappingURL=ip-accordion.entry.js.map