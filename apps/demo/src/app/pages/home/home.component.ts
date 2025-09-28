import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tooltip1Component } from '../tooltip/tooltip1/tooltip1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Tooltip1Component, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
