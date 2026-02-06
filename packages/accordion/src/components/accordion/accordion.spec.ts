import { newSpecPage } from 'jest-stencil-runner';
import { Ipaccordion } from './accordion';

describe('ip-accordion', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Ipaccordion],
      html: `<ip-accordion></ip-accordion>`,
    });
    expect(page.root).toEqualHtml(`
        <ip-accordion>
            <mock:shadow-root>
                <div part="ip-accordion" class="ip-accordion" id="ip-accordion">
                    <div part="acc-panel acc-panel-1" class="ip-acc-panel" >
                        <h2 part="acc-header" class="js-acc-button">
                        <button part="acc-btn" aria-label="Afficher plus d'information sur {nom de la section}" aria-expanded="false" aria-controls="sect-1" id="accordion-1">
                            <span part="acc-title" class="accordion-title">Accessibilité</span>
                        </button>
                        </h2>
                        <div part="acc-content" id="sect-1" class="js-panel hidden" >
                            <div class="acc-content">
                                <img class="acc-content__image" src="/assets/images/tab-img-1.png" alt="">
                                <div class="acc-content__desc-wrapper">
                                    <h4 class="acc-content__title">6 Bonnes Pratiques pour être en Conformité</h4>
                                    <p class="acc-content__desc">Aujourd'hui, encore beaucoup de sites Web et d'applications mobiles 
                                    sont conçus sans penser à la navigation des personnes en situation de handicap. 
                                    Pourtant, pour ces personnes, l'outil digital représente un véritable levier d'intégration, et leur apporte bien souvent un surcroît d'indépendance.
                                    Selon les différents types de handicaps, les manquements les plus couramment relevés sur le Web ne sont pas les mêmes.</p>
                                    <a class="acc-content__btn" aria-label="En savoir plus, 6 Bonnes Pratiques pour être en Conformité" href="#">En&nbsp;savoir&nbsp;plus</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </mock:shadow-root>
        </ip-accordion>
        `);
  });

  it('renders with content', async () => {
    const page = await newSpecPage({
      components: [Ipaccordion],
      html: `
            <ip-accordion accordion-headers='[{"title":"Panel 1","ariaText":"panel-1"}]'>
            <div slot="accordion-1">Content 1</div>
            </ip-accordion>
        `,
    });
    expect(page.root).toEqualHtml(`
        <ip-accordion accordion-headers='[{"title":"Panel 1","ariaText":"panel-1"}]'>
            <mock:shadow-root>
                <div part="ip-accordion" class="ip-accordion" id="ip-accordion">
                    <div part="acc-panel acc-panel-1" class="ip-acc-panel">
                        <h2 part="acc-header" class="js-acc-button">
                            <button part="acc-btn" aria-expanded="false" aria-controls="panel-1" >
                                <span part="acc-title" class="accordion-title">Panel 1</span>
                            </button>
                        </h2>
                        <div part="acc-content" id="panel-1" class="js-panel hidden" >
                        <slot name="accordion-1"></slot>
                        </div>
                    </div>
                </div>
            </mock:shadow-root>
            <div slot="accordion-1" >Content 1</div>
        </ip-accordion>
    `);
  });
});
