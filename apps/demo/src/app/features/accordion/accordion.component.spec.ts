import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';

@Component({
  imports: [AccordionComponent],
  template: `
    <app-accordion title="Code" [alwaysOpen]="alwaysOpen">
      <a href="#example">Example</a>
    </app-accordion>
  `,
})
class HostComponent {
  alwaysOpen = false;
}

// Change detection is left to Angular (autoDetectChanges + whenStable), so
// these tests check the view refreshes on its own after an event.

async function setUp(
  alwaysOpen = false,
): Promise<ComponentFixture<HostComponent>> {
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture = TestBed.createComponent(HostComponent);
  fixture.componentInstance.alwaysOpen = alwaysOpen;
  fixture.autoDetectChanges();
  await fixture.whenStable();
  return fixture;
}

function header(fixture: ComponentFixture<HostComponent>): HTMLElement {
  return fixture.nativeElement.querySelector('.header');
}

function link(fixture: ComponentFixture<HostComponent>): HTMLAnchorElement {
  return fixture.nativeElement.querySelector('.content a');
}

describe('AccordionComponent', () => {
  it('starts closed, its links out of the tab order', async () => {
    const fixture = await setUp();

    expect(header(fixture).getAttribute('aria-expanded')).toBe('false');
    expect(link(fixture).getAttribute('tabindex')).toBe('-1');
  });

  it('opens on click and brings its links back in the tab order', async () => {
    const fixture = await setUp();

    header(fixture).click();
    await fixture.whenStable();

    expect(header(fixture).getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('.content.open')).not.toBeNull();
    expect(link(fixture).hasAttribute('tabindex')).toBe(false);
  });

  it('opens and closes with Enter or Space', async () => {
    const fixture = await setUp();

    header(fixture).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' }),
    );
    await fixture.whenStable();
    expect(header(fixture).getAttribute('aria-expanded')).toBe('true');

    header(fixture).dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await fixture.whenStable();
    expect(header(fixture).getAttribute('aria-expanded')).toBe('false');
  });

  it('stays open when alwaysOpen is set', async () => {
    const fixture = await setUp(true);

    expect(header(fixture).getAttribute('aria-expanded')).toBe('true');
    expect(link(fixture).hasAttribute('tabindex')).toBe(false);
  });
});
