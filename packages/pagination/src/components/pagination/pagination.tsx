import {
  Component,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  Element,
} from '@stencil/core';

const COMPACT_MEDIA_QUERY = '(max-width: 460px)';
const COMPACT_VISIBLE_PAGES = 3;

@Component({
  tag: 'ip-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination {
  @Element() element: HTMLElement;

  @Prop() totalPages = 10;
  @Prop({ mutable: true }) currentPage = 1;
  @Prop() visiblePages = 5;
  @Prop() firstPageAriaLabel = 'Go to the first page';
  @Prop() prevPageAriaLabel = 'Go to the previous page';
  @Prop() nextPageAriaLabel = 'Go to the next page';
  @Prop() lastPageAriaLabel = 'Go to the last page';

  @State() pages: number[] = [];
  @State() isCompact = false;

  private shouldRestoreFocus = false;
  private compactQuery?: MediaQueryList;

  /**
   * Emitted when the user changes the page from the component (click or
   * keyboard). Not emitted when `currentPage` is set by the application,
   * so a listener can update `currentPage` without creating a loop.
   * The detail is the new page number.
   */
  @Event() pageChanged: EventEmitter<number>;

  @Watch('currentPage')
  handlePageChange(newPage: number) {
    const page = this.clampPage(newPage);
    if (page !== newPage) {
      // Triggers this watcher again with a valid value.
      this.currentPage = page;
      return;
    }
    this.updatePages();
  }

  @Watch('totalPages')
  handleTotalPagesChange() {
    if (this.totalPages < this.currentPage) {
      this.currentPage = this.totalPages;
    }
    this.updatePages();
  }

  @Watch('visiblePages')
  handleVisiblePagesChange() {
    this.updatePages();
  }

  connectedCallback() {
    // matchMedia is missing in some server-side (hydrate) environments.
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    this.compactQuery = window.matchMedia(COMPACT_MEDIA_QUERY);
    this.isCompact = this.compactQuery.matches;
    this.compactQuery.addEventListener('change', this.handleCompactChange);
  }

  disconnectedCallback() {
    this.compactQuery?.removeEventListener('change', this.handleCompactChange);
    this.compactQuery = undefined;
  }

  componentWillLoad() {
    this.currentPage = this.clampPage(this.currentPage);
    this.updatePages();
  }

  componentDidUpdate() {
    this.restoreFocusIfLost();
  }

  /** Only fires when the breakpoint is crossed, not on every resize. */
  private handleCompactChange = (event: MediaQueryListEvent) => {
    this.isCompact = event.matches;
    this.updatePages();
  };

  /**
   * Number of page buttons actually displayed. Derived from the
   * `visiblePages` prop without mutating it, so the value set by the
   * consumer is restored when the viewport becomes wide again.
   */
  private get displayedPageCount() {
    const count = Math.max(1, this.visiblePages);
    return this.isCompact ? Math.min(COMPACT_VISIBLE_PAGES, count) : count;
  }

  updatePages() {
    const totalVisiblePages = this.displayedPageCount;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(totalVisiblePages / 2),
    );
    const endPage = Math.min(
      this.totalPages,
      startPage + totalVisiblePages - 1,
    );

    if (endPage - startPage + 1 < totalVisiblePages) {
      startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  }

  handlePageClick(page: number) {
    this.goTo(page);
  }

  handleNextPage() {
    this.goTo(this.currentPage + 1);
  }

  handlePrevPage() {
    this.goTo(this.currentPage - 1);
  }

  handleFirstPage() {
    this.goTo(1);
  }

  handleLastPage() {
    this.goTo(this.totalPages);
  }

  /**
   * Navigation triggered by the user from inside the component.
   * Flags the next render so focus can be restored if the activated
   * button is no longer focusable (e.g. "next" disabled on the last page).
   */
  private goTo(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.shouldRestoreFocus = true;
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  /** Keeps a page number between 1 and totalPages. */
  private clampPage(page: number) {
    const lastPage = Math.max(1, this.totalPages);
    const value = Math.trunc(Number(page)) || 1;
    return Math.min(Math.max(1, value), lastPage);
  }

  /**
   * Only moves focus when the button the user activated lost it
   * (it became disabled). Programmatic changes, resizes and totalPages
   * updates never move focus.
   */
  private restoreFocusIfLost() {
    if (!this.shouldRestoreFocus) {
      return;
    }
    this.shouldRestoreFocus = false;

    const root = this.element.shadowRoot;
    const active = root?.activeElement as HTMLButtonElement | null;
    if (active && !active.disabled) {
      return;
    }

    root
      ?.querySelector<HTMLButtonElement>('button[aria-current="page"]')
      ?.focus();
  }

  render() {
    return (
      <nav aria-label="Pagination Navigation">
        <ul>
          <li>
            <button
              part="first-btn"
              class="first"
              aria-label={this.firstPageAriaLabel}
              onClick={() => this.handleFirstPage()}
              disabled={this.currentPage === 1}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li>
            <button
              part="prev-btn"
              class="previous"
              aria-label={this.prevPageAriaLabel}
              onClick={() => this.handlePrevPage()}
              disabled={this.currentPage === 1}
            >
              <span aria-hidden="true">&lsaquo;</span>
            </button>
          </li>
          {this.pages.map((page) => (
            <li key={page}>
              <button
                part="page-btn"
                aria-label={`Page ${page}`}
                aria-current={this.currentPage === page ? 'page' : undefined}
                class={this.currentPage === page ? 'current' : ''}
                onClick={() => this.handlePageClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              part="next-btn"
              class="next"
              aria-label={this.nextPageAriaLabel}
              onClick={() => this.handleNextPage()}
              disabled={this.currentPage === this.totalPages}
            >
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </li>
          <li>
            <button
              part="last-btn"
              class="last"
              aria-label={this.lastPageAriaLabel}
              onClick={() => this.handleLastPage()}
              disabled={this.currentPage === this.totalPages}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
