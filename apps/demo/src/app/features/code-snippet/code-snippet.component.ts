import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [Highlight, HighlightLineNumbers],
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetComponent {
  @Input() htmlCode = '';
  @Input() cssCode = '*{font-family: "Mulish";}';
  @Input() jsCode = 'import "./styles.css"';
  selectedTab: 'html' | 'css' = 'html';

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
