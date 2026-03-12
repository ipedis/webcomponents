import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      font-family: sans-serif;
    }
    h1 {
      font-size: 4rem;
      margin: 0;
    }
  `],
})
export class NotFoundComponent {}
