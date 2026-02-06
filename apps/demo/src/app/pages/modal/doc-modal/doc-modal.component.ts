import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-doc-modal',
  standalone: true,
  imports: [Highlight],
  templateUrl: './doc-modal.component.html',
  styleUrl: './doc-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocModalComponent {
  import = `import '../node_modules/ip-modal/dist/ip-modal/ip-modal.esm';`;
  installationScript = `npm install ip-modal`;
  content = `<ip-modal button-text="Open Modal">
  <div slot="content" class="content">
    Join thousands getting emails in their inbox. Lorem ipsum dolor sit amet,
    consectetur adipisicing elit. Hic, unde ipsa quam quo aperiam nostrum
    repellat laboriosam praesentium atque saepe, obcaecati, perferendis
    molestias delectus? Maiores, cupiditate tempora. Obcaecati, omnis sunt!
  </div>
</ip-modal>`;

  example1 = `ip-modal::part(trigger-button) {
  background-color: #305b38;
  border: 1px solid black;
}
`;
}
