import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DocTabPanelComponent } from '../doc-tab-panel/doc-tab-panel.component';
import { defineCustomElements as tabPanelElements } from '@ipedis/tab-panel/loader';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';

import { RouterLink } from '@angular/router';
import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-tab-panel1',
  standalone: true,
  imports: [
    DocTabPanelComponent,
    CodeSnippetComponent,
    RouterLink,
    AccordionComponent
],
  templateUrl: './tab-panel1.component.html',
  styleUrl: './tab-panel1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabPanel1Component {
  tabPanelCode = `
  <ip-tab-panel
      selected-tab="tab-content-2"
      title-tag="h2"
      tab-panel-title="Audit RGAA"
      tab-panel-headers='[
          {"title":"Accessibilité",
          "imgPath": "assets/images/acc-1.svg",
          "imgPathActive": "assets/images/acc-1-active.svg"
          },
          {"title":"Pdf Document",
           "imgPath":"assets/images/acc-2.svg",
            "imgPathActive": "assets/images/acc-2-active.svg"
          },
          {"title":"Statistical",
          "imgPath":"assets/images/acc-3.svg",
          "imgPathActive": "assets/images/acc-3-active.svg"
          },
          {"title":"Certification",
          "imgPath":"assets/images/acc-4.svg",
          "imgPathActive": "assets/images/acc-4-active.svg"
          },
          {"title":"Legislation",
          "imgPath":"assets/images/acc-5.svg",
          "imgPathActive": "assets/images/acc-5-active.svg"
          }
        ]'
    >
      <div class="ip-content" slot="tab-content-1">
        <img src="assets/images/tab-img-1.png" alt="" />
        <div class="ip-content-desc">
          <h2 class="ip-content-title">Accessibilité</h2>
          <h3 class="ip-content-subtitle">
            6 Bonnes Pratiques pour être en Conformité
          </h3>
          <p class="ip-content-text">
        Aujourd’hui, encore beaucoup de sites Web et d’applications
        mobiles sont conçus sans penser à la navigation des
        personnes en situation de handicap. Pourtant, pour ces
        personnes, l’outil digital représente un véritable
       levier d’intégration, et leur apporte bien
        souvent un surcroît d’indépendance.Selon les différents
        types de handicaps, les manquements les plus couramment
         relevés sur le Web ne sont pas les mêmes.
          </p>
          <button
            class="ip-content-btn"
            aria-label="En savoir plus,
            6 Bonnes Pratiques pour être en Conformité"
          >
            En savoir plus
            <img src="assets/images/arrow-right.svg" alt="" />
          </button>
        </div>
      </div>

      <div class="ip-content" slot="tab-content-2">
        <img src="./assets/images/tab-img-2.png" alt="" />
        <div class="ip-content-desc">
          <h2 class="ip-content-title">DOCUMENT PDF</h2>
          <h3 class="ip-content-subtitle">
          Comment ont été conçus les PDF ?</h3>
          <p class="ip-content-text">
        À l’origine, les documents PDF
        n’étaient pas conçus pour être lus
        via un ordinateur mais pour être imprimés.
         Aujourd’hui, les
        documents PDF sont de plus en plus utilisés par
        les entreprises pour
        échanger et diffuser de l’information numérique
        de façon plus
        professionnelle (présentation, sécurité pour
        la protection de
        données). Sans traitement, les documents PDF
        sont inaccessibles pour
        des personnes non-voyantes utilisant des outils
        tels qu’un lecteur d’écran.
          </p>
          <button class="ip-content-btn">
            En savoir plus
            <img src="./assets/images/arrow-right.svg" alt="" />
          </button>
        </div>
      </div>

      <div class="ip-content" slot="tab-content-3">
        <img src="./assets/images/tab-img-3.png" alt="" />
        <div class="ip-content-desc">
          <h2 class="ip-content-title">Statistical</h2>
          <h3 class="ip-content-subtitle">
          Gérer efficacement la création</h3>
          <p class="ip-content-text">
        PubliSpeak a été pensé pour vous faciliter
        la gestion de vos publications. Toutes les informations
        relatives à votre publication sont consultables en un
        clin d'œil. Titre, clients, nombre de pages,
        langues, dates et statuts. Les statuts font intégralement
        partie du cycle de vie d’une publication et de votre gestion
        de projet. Rendre visible son travail pour le faire valider
        par ses collaborateurs ou
        ses clients n’est pas de tout repos.
          </p>
          <button class="ip-content-btn">
            En savoir plus
            <img src="./assets/images/arrow-right.svg" alt="" />
          </button>
        </div>
      </div>

      <div class="ip-content" slot="tab-content-4">
        <img src="./assets/images/tab-img-4.jpeg" alt="" />
        <div class="ip-content-desc">
          <h2 class="ip-content-title">Certification</h2>
          <h3 class="ip-content-subtitle">
          Nos équipes vous accompagnent</h3>
          <p class="ip-content-text">
        Notre plateforme de publications digitales répond à vos
        besoins mais vous n’êtes pas à l'aise avec l’accessibilité
        numérique.Pas de panique, onboarding, formation et support,
        nos équipes vous accompagnent vers l’autonomie et la prise
        en main de l’accessibilité numérique.Associez vos publications
        entre elles et construisez un
        corpus de documents afin de permettre à votre lecteur de naviguer
        facilement entre vos différentes publications.
          </p>
          <button class="ip-content-btn">
            En savoir plus
            <img src="./assets/images/arrow-right.svg" alt="" />
          </button>
        </div>
      </div>

      <div class="ip-content" slot="tab-content-5">
        <img src="./assets/images/tab-img-5.jpg" alt="" />
        <div class="ip-content-desc">
          <h2 class="ip-content-title">Legislation</h2>
          <h3 class="ip-content-subtitle">
            Valider votre travail auprès de vos clients
          </h3>
          <p class="ip-content-text">
        PubliSpeak est un SaaS prêt à l’emploi.
        Il permet de charger votre
        fichier PDF initial final en un clic et de personnaliser la
        publication selon vos envies.
        L’éditeur est un formidable moteur de
        création pour la vue article.
        Et plus les lecteurs restent, plus ils sont convaincus !
        Si le temps vous manque, des “inspirations” sont
        prêtes à l’emploi !
        Néanmoins, si vous préférez déléguer la partie
        édition, notre studio dédié s’en chargera.
          </p>
          <button class="ip-content-btn">
            En savoir plus
            <img src="./assets/images/arrow-right.svg" alt="" />
          </button>
        </div>
      </div>
    </ip-tab-panel>
  `;

  cssTabPanel = `
ip-tab-panel::part(tab) {
  gap: 5px;
  color: purple;
  position: relative;
}
ip-tab-panel::part(tab-container) {
  font-family: 'Mulish-light';
}
ip-tab-panel::part(tab-panel-title) {
  font-family: 'Mulish-light';
}
ip-tab-panel::part(tab-active) {
  background-color: purple;
  color: white;
}

ip-tab-panel::part(tab-header) {
  outline: 2px solid red;
  outline-offset: 0.025em;
  display: flex;
  flex-direction: column;
}

ip-tab-panel::part(tab-list) {
  display: flex;
  flex-direction: column;
}

.ip-content {
  margin-block: 1rem;
  display: flex;
}

.ip-content img {
  border-radius: 0.625em;
  object-fit: contain;
  width: 350px;
}

.ip-content .ip-content-desc {
  margin-left: 3.125em;
  margin-right: 25px;
}

.ip-content .ip-content-title {
  margin-block-start: 2.188em;
  font-family: 'Mulish-light';
  font-size: 1.125rem;
  color: #b00057;
  text-transform: uppercase;
}

.ip-content .ip-content-subtitle {
  margin-top: 15px;
  font-family: 'Mulish-light';
  font-size: 42px;
  color: #b00057;
}

.ip-content .ip-content-text {
  margin-top: 20px;
  font-family: 'Mulish-light';
  font-size: 18px;
  color: #2e3243;
}

.ip-content .ip-content-btn {
  margin-top: 20px;
  font-family: 'Mulish-light';
  font-size: 16px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background-color: #b00057;
  color: #ffffff;
  cursor: pointer;
}

.ip-content .ip-content-btn img {
  margin-left: 15px;
  width: 14px;
  height: 15px;
  vertical-align: middle;
}

.tab-panel {
  max-width: 960px;
  margin: 20px auto;
}

.panel-wrapper {
  border: 1px solid $darkColor;
  border-radius: 5px;
}
  `;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && tabPanelElements) {
      tabPanelElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
