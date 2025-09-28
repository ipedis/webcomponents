import { Component, Input, ElementRef, Renderer2, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements AfterViewInit, OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() title = '';
  @Input() alwaysOpen = false;
  isOpen = false;
  contentId = '';
  headerId = '';

  ngOnInit() {
    this.contentId = `accordion-content-${Math.random().toString(36).substr(2, 9)}`;
    this.headerId = `accordion-header-${Math.random().toString(36).substr(2, 9)}`;
  }

  ngAfterViewInit() {
    this.updateFocusability();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateFocusability();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  private updateFocusability() {
    const contentElement = this.el.nativeElement.querySelector('.content');
    const focusableElements = contentElement.querySelectorAll(
      'a, button, input, select, textarea',
    );

    focusableElements.forEach((element: HTMLElement) => {
      if (this.isOpen || this.alwaysOpen) {
        this.renderer.removeAttribute(element, 'tabindex');
        this.renderer.setAttribute(element, 'aria-hidden', 'false');
      } else {
        this.renderer.setAttribute(element, 'tabindex', '-1');
        this.renderer.setAttribute(element, 'aria-hidden', 'true');
      }
    });
  }
}
