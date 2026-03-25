import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [Highlight, TranslocoPipe],
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetComponent {
  @Input() htmlCode = '';
  @Input() cssCode = '*{font-family: "Mulish";}';
  @Input() jsCode = 'import "./styles.css"';
  selectedTab: 'html' | 'css' = 'html';
  private readonly translocoService = inject(TranslocoService);

  selectTab(tab: 'html' | 'css') {
    this.selectedTab = tab;
  }
  handleKeyDown(event: KeyboardEvent, tab: 'html' | 'css') {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectTab(tab);
    }
  }

  copyCode() {
    let codeToCopy = '';
    if (this.selectedTab === 'html') {
      codeToCopy = this.htmlCode;
    } else if (this.selectedTab === 'css') {
      codeToCopy = this.cssCode;
    } else if (this.selectedTab === 'js') {
      codeToCopy = this.jsCode;
    }

    navigator.clipboard.writeText(codeToCopy);
  }
}
