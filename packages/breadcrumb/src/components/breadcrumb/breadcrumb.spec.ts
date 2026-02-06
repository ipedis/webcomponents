import { newSpecPage } from 'jest-stencil-runner';
import { BreadcrumbComponent } from './breadcrumb';

describe('ip-breadcrumb', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [BreadcrumbComponent],
      html: '<ip-breadcrumb></ip-breadcrumb>',
    });
    expect(root).toEqualHtml(`
            <ip-breadcrumb>
                <mock:shadow-root>
    <div class="wrapper-title">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <ol class="breadcrumb" part="breadcrumb" role="list"></ol>
        </nav>
      </div>
            </mock:shadow-root>
        </ip-breadcrumb>
        `);
  });
  it('renders with breadcrumb title and items', async () => {
    const { root } = await newSpecPage({
      components: [BreadcrumbComponent],
      html: `
                <ip-breadcrumb
                    breadcrumb-title="Bread"
                    breadcrumb-items='[
                        {"label": "Home", "link": "/home"},
                        {"label": "Category", "link": "/Category"},
                        {"label": "Item"}
                    ]'
                ></ip-breadcrumb>
            `,
    });
    expect(root).toEqualHtml(`
             <ip-breadcrumb
                    breadcrumb-title="Bread"
                    breadcrumb-items='[
                        {"label": "Home", "link": "/home"},
                        {"label": "Category", "link": "/Category"},
                        {"label": "Item"}
                    ]'
                >
                <mock:shadow-root>
                      <div class="wrapper-title">
        <h1 part="title">Bread</h1>
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <ol class="breadcrumb" part="breadcrumb" role="list">
            <li class="breadcrumb-item" role="listitem">
              <a
                href="/home"
                aria-label="Link to Home"
                role="link"
                part="breadcrumb"
                >Home</a
              ><span part="icon" aria-hidden="true" class="icon">&gt;</span>
            </li>
            <li class="breadcrumb-item" role="listitem">
              <a
                href="/Category"
                aria-label="Link to Category"
                role="link"
                part="breadcrumb"
                >Category</a
              ><span part="icon" aria-hidden="true" class="icon">&gt;</span>
            </li>
            <li class="breadcrumb-item active" aria-current="page" role="none">
              <span>Item</span>
            </li>
          </ol>
        </nav>
      </div>
                </mock:shadow-root>
            </ip-breadcrumb>
        `);
  });
});
