import { newSpecPage } from 'jest-stencil-runner';
import { IpTabPanel } from './tap-panel';

describe('ip-tab-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IpTabPanel],
      html: `<ip-tab-panel></ip-tab-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <ip-tab-panel>
        <mock:shadow-root>
            <div class="ip-tab">
                <div part="tab-container" class="ip-tab-header">
                    <div role="tablist" part="tab-btn-list" class="ip-tab-buttons" id="tab-buttons">
                        <button class="tab-content-active" part="tab-btn tab-btn-active" id="tab-1" type="button" role="tab" aria-selected="" aria-controls="tab-content-1" tabindex="0" title="Tab-Header-1">
                            <img part="tab-icon tab-icon-active" class="tab-panel-icon" src="/assets/acc-1-active.svg" alt=""><span part="tab-text" class="tab-panel-text">Tab-Header-1</span>
                        </button>
                    </div>
                </div>
                <div id="tab-list-content"><div id="tab-content-undefined" role="tabpanel" aria-labelledby="tab-undefined">
                    <div class="ip-content">
                        <img src="/assets/tab-img-1.png" alt="">
                        <div class="ip-content-desc">
                            <h2 class="ip-content-title">Accessibilité</h2>
                            <h3 class="ip-content-subtitle">6&nbsp;Bonnes Pratiques pour être en Conformité</h3>
                            <p class="ip-content-text">Aujourd'hui, encore beaucoup de sites Web et d'applications mobiles sont conçus sans penser à la navigation des personnes en situation de handicap. Pourtant, pour ces personnes, l'outil digital représente un véritable levier d'intégration, et leur apporte bien souvent un surcroît d'indépendance. Selon les différents types de handicaps, les manquements les plus couramment relevés sur le Web ne sont pas les mêmes.</p>
                            <button class="ip-content-btn">En savoir plus<img src="/assets/arrow-right.svg" alt=""></button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </mock:shadow-root>
      </ip-tab-panel>
    `);
  });

  it('renders with content', async () => {
    const page = await newSpecPage({
      components: [IpTabPanel],
      html: `<ip-tab-panel selected-tab="tab-content-5" title-tag="h2"tab-panel-title="Audit RGAA" tab-panel-headers='[ {"title":"Accessibilité"}, {"title":"Pdf Document"}, {"title":"Statistical"}, {"title":"Certification"}, {"title":"Legislation"}]'>
      <div slot="tab-content-1">--content of Accessibilité--</div>
      <div slot="tab-content-2">--content of Pdf Document--</div>
      <div slot="tab-content-3">--content of Statistical--</div>
      <div slot="tab-content-4">--content of Certification--</div>
      <div slot="tab-content-5">--content of Legislation--</div>
    </ip-tab-panel>`,
    });
    expect(page.root).toEqualHtml(`
            <ip-tab-panel selected-tab="tab-content-5" title-tag="h2"tab-panel-title="Audit RGAA" tab-panel-headers='[ {"title":"Accessibilité"}, {"title":"Pdf Document"}, {"title":"Statistical"}, {"title":"Certification"}, {"title":"Legislation"}]'>
                <mock:shadow-root>
                    <div class="ip-tab">
                        <div part="tab-container" class="ip-tab-header">
                            <h2 part="tab-panel-title" id="tablist-1" class="ip-tab-header-title">Audit RGAA</h2>
                            <div role="tablist" part="tab-btn-list" aria-labelledby="tablist-1" class="ip-tab-buttons" id="tab-buttons">
                            <button class="" id="tab-1" type="button" role="tab" part="tab-btn tab-btn-1" aria-selected="false" aria-controls="tab-content-1" tabindex="-1" >
                                <span part="tab-text" class="tab-panel-text">Accessibilité</span>
                            </button>
                            <button class="" id="tab-2" type="button" role="tab" part="tab-btn tab-btn-2" aria-selected="false" aria-controls="tab-content-2" tabindex="-1" >
                                <span part="tab-text" class="tab-panel-text">Pdf Document</span>
                            </button>
                            <button class="" id="tab-3" type="button" role="tab" part="tab-btn tab-btn-3" aria-selected="false" aria-controls="tab-content-3" tabindex="-1" >
                                <span part="tab-text" class="tab-panel-text">Statistical</span>
                            </button>
                            <button class="" id="tab-4" type="button" role="tab" part="tab-btn tab-btn-4" aria-selected="false" aria-controls="tab-content-4" tabindex="-1" >
                                <span part="tab-text" class="tab-panel-text">Certification</span>
                            </button>
                            <button class="tab-content-active" id="tab-5" type="button" role="tab" part="tab-btn tab-btn-5 tab-btn-active" aria-selected="true" aria-controls="tab-content-5" tabindex="0" >
                                <span part="tab-text" class="tab-panel-text">Legislation</span>
                            </button>
                            </div>
                        </div>
                        <div id="tab-list-content">
                            <div id="tab-content-undefined" role="tabpanel" aria-labelledby="tab-undefined">
                            <slot name="tab-content-5"></slot>
                        </div>
                        </div>
                    </div>
        </mock:shadow-root>
            <div slot="tab-content-1">--content of Accessibilité--</div>
            <div slot="tab-content-2">--content of Pdf Document--</div>
            <div slot="tab-content-3">--content of Statistical--</div>
            <div slot="tab-content-4">--content of Certification--</div>
            <div slot="tab-content-5">--content of Legislation--</div>
      </ip-tab-panel>
    `);
  });
});
