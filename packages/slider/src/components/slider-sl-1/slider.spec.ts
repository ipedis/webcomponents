import { newSpecPage } from 'jest-stencil-runner';
import { IpSliderSl1 } from './slider';

describe('ip-slider-sl-1', () => {
  it('renders and initializes with default values', async () => {
    const page = await newSpecPage({
      components: [IpSliderSl1],
      html: `<ip-slider-sl-1></ip-slider-sl-1>`,
    });
    expect(page.root).toEqualHtml(`
        <ip-slider-sl-1>
            <mock:shadow-root>
            <div class="slider" aria-label="Carousel Slider" role="group" >
  <div class="slider-items">
    <ul class="slider__ul" role="list" style="gap: NaNvw"></ul>
  </div>
  <div>
    <button
      part="left-btn"
      aria-label="Previous slide"
      class="btn btn-previous"
    >
      <svg
        class="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.2534 0.561123L0.505371 11.9971L11.2507 23.506C11.6956 23.9826 12.4163 23.9818 12.8604 23.5044C13.2704 23.0637 13.3013 22.3708 12.9537 21.892L12.8589 21.777L3.7316 12.0025L12.8563 2.2958C13.2683 1.85736 13.3026 1.16468 12.9573 0.683949L12.8631 0.568451C12.4545 0.126282 11.809 0.0894733 11.361 0.460003L11.2534 0.561123Z"
          fill="var(--svg-color)"
        ></path>
      </svg></button
    ><button part="right-btn" aria-label="Next slide" class="btn btn-next">
      <svg
        class="svg-icon"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.07713 23.6408L15.0908 12.0385L3.08011 0.362144C2.58278 -0.121338 1.77721 -0.120604 1.28081 0.363785C0.822602 0.810913 0.787999 1.51385 1.17655 1.99962L1.2825 2.11627L11.4847 12.033L1.28548 21.8809C0.824898 22.3257 0.786557 23.0284 1.17252 23.5161L1.27785 23.6333C1.73454 24.0819 2.45607 24.1193 2.95682 23.7433L3.07713 23.6408Z"
          fill="var(--svg-color)"
        ></path>
      </svg>
    </button>
  </div>
  <div class="slider-bullets" role="group" aria-label="Carousel Pagination">
    <ul class="slider-bullets__ul"></ul>
  </div>
</div>
            </mock:shadow-root>
        </ip-slider-sl-1>
            `);
  });
  it('render with slot content', async () => {
    const page = await newSpecPage({
      components: [IpSliderSl1],
      html: `<ip-slider-sl-1>
            <div slot="1">Slide 1</div>
            <div slot="2">Slide 2</div>
            <div slot="3">Slide 3</div>
          </ip-slider-sl-1>`,
    });
    expect(page.root).toEqualHtml(`
        <ip-slider-sl-1>
            <mock:shadow-root>
            <div class="slider" aria-label="Carousel Slider" role="group">
  <div class="slider-items">
    <ul class="slider__ul" role="list" style="gap: NaNvw">
      <li class="slider__li" role="listitem"><slot name="slide-1"></slot></li>
      <li class="slider__li" role="listitem"><slot name="slide-2"></slot></li>
      <li class="slider__li" role="listitem"><slot name="slide-3"></slot></li>
    </ul>
  </div>
  <div>
    <button
      part="left-btn"
      aria-label="Previous slide"
      class="btn btn-previous"
    >
      <svg
        class="svg-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.2534 0.561123L0.505371 11.9971L11.2507 23.506C11.6956 23.9826 12.4163 23.9818 12.8604 23.5044C13.2704 23.0637 13.3013 22.3708 12.9537 21.892L12.8589 21.777L3.7316 12.0025L12.8563 2.2958C13.2683 1.85736 13.3026 1.16468 12.9573 0.683949L12.8631 0.568451C12.4545 0.126282 11.809 0.0894733 11.361 0.460003L11.2534 0.561123Z"
          fill="var(--svg-color)"
        ></path>
      </svg></button
    ><button part="right-btn" aria-label="Next slide" class="btn btn-next">
      <svg
        class="svg-icon"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.07713 23.6408L15.0908 12.0385L3.08011 0.362144C2.58278 -0.121338 1.77721 -0.120604 1.28081 0.363785C0.822602 0.810913 0.787999 1.51385 1.17655 1.99962L1.2825 2.11627L11.4847 12.033L1.28548 21.8809C0.824898 22.3257 0.786557 23.0284 1.17252 23.5161L1.27785 23.6333C1.73454 24.0819 2.45607 24.1193 2.95682 23.7433L3.07713 23.6408Z"
          fill="var(--svg-color)"
        ></path>
      </svg>
    </button>
  </div>
  <div class="slider-bullets" role="group" aria-label="Carousel Pagination">
    <ul class="slider-bullets__ul"></ul>
  </div>
</div>
            </mock:shadow-root>
            <div slot="1">Slide 1</div>
            <div slot="2">Slide 2</div>
            <div slot="3">Slide 3</div>
        </ip-slider-sl-1>
            `);
  });
});
