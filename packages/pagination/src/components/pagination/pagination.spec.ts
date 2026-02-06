import { newSpecPage } from 'jest-stencil-runner';
import { Pagination } from './pagination';

describe('ip-pagination', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Pagination],
      html: '<ip-pagination></ip-pagination>',
    });
    expect(page.root).toEqualHtml(`
            <ip-pagination>
                <mock:shadow-root>
                    <nav aria-label="Pagination Navigation">
                        <ul>
                            <li><button class="first" part="first-btn" aria-label="Go to the first page"  disabled=""><span aria-hidden="true">«</span></button></li>
                            <li><button class="previous" part="prev-btn" aria-label="Go to the previous page"  disabled=""><span aria-hidden="true">‹</span></button></li>
                            <li><button aria-label="Page 1" part="page-btn" aria-current="page" class="current">1<span class="sr-only">Current page</span></button></li>
                            <li><button aria-label="Page 2" part="page-btn" class="">2<span class="sr-only"></span></button></li>
                            <li><button aria-label="Page 3" part="page-btn" class="">3<span class="sr-only"></span></button></li>
                            <li><button aria-label="Page 4" part="page-btn" class="">4<span class="sr-only"></span></button></li>
                            <li><button aria-label="Page 5" part="page-btn" class="">5<span class="sr-only"></span></button></li>
                            <li><button class="next" part="next-btn" aria-label="Go to the next page" ><span aria-hidden="true">›</span></button></li>
                            <li><button class="last" part="last-btn" aria-label="Go to the last page" ><span aria-hidden="true">»</span></button></li>
                        </ul>
                    </nav>
                </mock:shadow-root>
            </ip-pagination>
        `);
  });
  it('should have specific current page and total pages', async () => {
    const page = await newSpecPage({
      components: [Pagination],
      html: '<ip-pagination total-pages="8" current-page="5"></ip-pagination>',
    });
    expect(page.root).toEqualHtml(`
            <ip-pagination total-pages="8" current-page="5">
                <mock:shadow-root>
                    <nav aria-label="Pagination Navigation">
                        <ul>
                            <li><button class="first" part="first-btn" aria-label="Go to the first page" ><span aria-hidden="true">«</span></button></li>
                            <li><button class="previous" part="prev-btn" aria-label="Go to the previous page"  ><span aria-hidden="true">‹</span></button></li>
                            <li><button aria-label="Page 3" part="page-btn" class="">3<span class="sr-only"></span></button></li>
                            <li><button aria-label="Page 4" part="page-btn" class="">4<span class="sr-only"></span></button></li>
                            <li><button aria-label="Page 5" part="page-btn" aria-current="page" class="current">5<span class="sr-only">Current page</span></button></li>
                            <li><button aria-label="Page 6" part="page-btn" class="">6<span class="sr-only"></span></button></li>
                            <li><button aria-label="Page 7" part="page-btn" class="">7<span class="sr-only"></span></button></li>
                            <li><button class="next" part="next-btn" aria-label="Go to the next page"><span aria-hidden="true">›</span></button></li>
                            <li><button class="last" part="last-btn" aria-label="Go to the last page" ><span aria-hidden="true">»</span></button></li>
                        </ul>
                    </nav>
                </mock:shadow-root>
            </ip-pagination>
        `);
  });
});
