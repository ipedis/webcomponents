import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';
import { RouterLink } from '@angular/router';
import { DocAccordionComponent } from '../doc-accordion/doc-accordion.component';
import { defineCustomElements as accordionElements } from '@ipedis/accordion/loader';
import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-accordion1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocAccordionComponent,
    RouterLink,
    AccordionComponent
],
  templateUrl: './accordion1.component.html',
  styleUrl: './accordion1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Accordion1Component {
  accordionCode = `
<ip-accordion
  title-tag="h2"
  gap="20"
  is-first-panel-open="true"
  is-single-open="true"
  accordion-headers='[
   {
    "title": "Accessibilité", "iconPath": "assets/images/acc-1.svg",
    "iconActivePath": "assets/images/acc-1-active.svg", "id": "accordion-1",
    "ariaText": "sect-1"
    },
   {
    "title": "Pdf Document", "iconPath": "assets/images/acc-2.svg",
    "iconActivePath": "assets/images/acc-2-active.svg", "id": "accordion-2",
     "ariaText": "sect-2"
     },
   {
     "title": "Statistical", "iconPath": "assets/images/acc-3.svg",
    "iconActivePath": "assets/images/acc-3-active.svg", "id": "accordion-3",
     "ariaText": "sect-3"
    },
   {
    "title": "Certification", "iconPath": "assets/images/acc-4.svg",
    "iconActivePath": "assets/images/acc-4-active.svg", "id": "accordion-4",
    "ariaText": "sect-4"
   }
 ]'
>
  <div
    class="acc-content"
    slot="accordion-1"
    role="region"
    aria-labelledby="accordion-1"
  >
    <img class="acc-content__image" src="assets/images/tab-img-1.png" alt="" />

    <div class="acc-content__desc-wrapper">
      <h4 class="acc-content__title">
        6 Bonnes Pratiques pour être en Conformité
      </h4>
      <p class="acc-content__desc">
        Aujourd’hui, encore beaucoup de sites Web et d’applications mobiles sont
        conçus sans penser à la navigation des personnes en situation de
        handicap. Pourtant, pour ces personnes, l’outil digital représente un
        véritable levier d’intégration, et leur apporte bien souvent un surcroît
        d’indépendance. Selon les différents types de handicaps, les manquements
        les plus couramment relevés sur le Web ne sont pas les mêmes.
      </p>
      <a
        class="acc-content__btn"
        aria-label="En savoir plus, 6 Bonnes Pratiques pour être
     en Conformité"
        href="#"
      >
        En savoir plus
      </a>
    </div>
  </div>

  <div
    class="acc-content"
    slot="accordion-2"
    role="region"
    aria-labelledby="accordion-2"
  >
    <img class="acc-content__image" src="assets/images/tab-img-2.png" alt="" />

    <div class="acc-content__desc-wrapper">
      <h4 class="acc-content__title">Comment ont été conçus les PDF ?</h4>
      <p class="acc-content__desc">
        À l’origine, les documents PDF n’étaient pas conçus pour être lus via un
        ordinateur mais pour être imprimés. Aujourd’hui, les documents PDF sont
        de plus en plus utilisés par les entreprises pour échanger et diffuser
        de l’information numérique de façon plus professionnelle (présentation,
        sécurité pour la protection de données). Sans traitement, les documents
        PDF sont inaccessibles pour des personnes non-voyantes utilisant des
        outils tels qu’un lecteur d’écran.
      </p>
      <a
        class="acc-content__btn"
        aria-label="En savoir plus sur Comment ont été conçus les PDF ?"
        href="#"
      >
        En savoir plus
      </a>
    </div>
  </div>

  <div
    class="acc-content"
    slot="accordion-3"
    role="region"
    aria-labelledby="accordion-3"
  >
    <img class="acc-content__image" src="assets/images/tab-img-3.png" alt="" />

    <div class="acc-content__desc-wrapper">
      <h4 class="acc-content__title">Gérer efficacement la création</h4>
      <p class="acc-content__desc">
        PubliSpeak a été pensé pour vous faciliter la gestion de vos
        publications. Toutes les informations relatives à votre publication sont
        consultables en un clin d'œil. Titre, clients, nombre de pages, langues,
        dates et statuts. Les statuts font intégralement partie du cycle de vie
        d’une publication et de votre gestion de projet. Rendre visible son
        travail pour le faire valider par ses collaborateurs ou ses clients
        n’est pas de tout repos.
      </p>
      <a
        class="acc-content__btn"
        En savoir plus sur comment gerer efficacement la creation"
        href="#"
      >
        En savoir plus
      </a>
    </div>
  </div>

  <div
    class="acc-content"
    slot="accordion-4"
    role="region"
    aria-labelledby="accordion-4"
  >
    <img class="acc-content__image" src="assets/images/tab-img-4.jpeg" alt="" />

    <div class="acc-content__desc-wrapper">
      <h4 class="acc-content__title">Nos équipes vous accompagnent</h4>
      <p class="acc-content__desc">
        Notre plateforme de publications digitales répond à vos besoins mais
        vous n’êtes pas à l'aise avec l’accessibilité numérique .Pas de panique,
        onboarding, formation et support, nos équipes vous accompagnent vers
        l’autonomie et la prise en main de l’accessibilité numérique.Associez
        vos publications entre elles et construisez un corpus de documents afin
        de permettre à votre lecteur de naviguer facilement entre vos
        différentes publications.
      </p>
      <a
        class="acc-content__btn"
        aria-label="En savoir plussur Nos équipes vous accompagnent"
        href="#"
      >
        En savoir plus
      </a>
    </div>
  </div>
</ip-accordion>
`;
  cssAccordion = `
ip-accordion {
  --ip-acc-font: 'Mulish-light';
}
.ip-accordion {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.acc-content {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.acc-content__title {
  margin-block-start: 2.188em;
  font-size: 1.125rem;
  color: #b00057;
  text-transform: uppercase;
}
a {
  text-decoration: none;
  color: #b00057;
}
.acc-content__btn {
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

.ip-accordion .ip-accordion-panel {
  visibility: visible;
  opacity: 1;
  max-height: 1000px;
  transition: all 0.3s ease-in;
}
.ip-accordion .js-acc-panel-hide {
  transition: all 0.3s ease-in;
  opacity: 0;
  max-height: 0;
  visibility: hidden;
}
@media (max-width: 768px) {
  .acc-content {
    flex-direction: column;
    gap: 1rem;
  }

  .acc-content__btn {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .ip-accordion {
    padding: 1rem;
  }

  .acc-content {
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .acc-content__title {
    font-size: 1rem;
  }

  .acc-content__btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}
  `;
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && accordionElements) {
      accordionElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
