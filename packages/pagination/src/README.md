# Pagination Component Documentation

[Figma link](https://www.figma.com/design/63w4li687mfdYtETlBu6a9/Component---Mixed?node-id=9-137&t=QwkWqR8keR0rsotb-0)

## Installation

### Step 1:

Install the `ip-pagination` component as a dependency in the project:

```bash
npm install ip-pagination
```

### Step 2:

Import the module in your script file:

```javascript or typescript
import '../node_modules/ip-pagination/dist/ip-pagination/ip-pagination.esm';
```

## Usage

To use this component, add the properties as attributes to the `<ip-pagination>` element.

### Properties

| Property             | Attribute               | Necessity | Description                                                | Type     | Default                     |
| -------------------- | ----------------------- | --------- | ---------------------------------------------------------- | -------- | --------------------------- |
| `totalPages`         | `total-pages`           | Required  | The total number of pages.                                 | `number` | `10`                        |
| `currentPage`        | `current-page`          | Optional  | The current active page.                                   | `number` | `1`                         |
| `visiblePages`       | `visible-pages`         | Optional  | The number of pages to display in the pagination controls. | `number` | `5`                         |
| `firstPageAriaLabel` | `first-page-aria-label` | Optional  | The aria-label for first page button.                      | `string` | `'Go to the first page'`    |
| `lastPageAriaLabel`  | `last-page-aria-label`  | Optional  | The aria-label for last page button.                       | `string` | `'Go to the last page'`     |
| `nextPageAriaLabel`  | `next-page-aria-label`  | Optional  | The aria-label for next page button.                       | `string` | `'Go to the next page'`     |
| `prevPageAriaLabel`  | `prev-page-aria-label`  | Optional  | The aria-label for previous page button.                   | `string` | `'Go to the previois page'` |

_e.g:_

```html
<ip-pagination
  total-pages="12"
  current-page="6"
  visible-pages="8"
></ip-pagination>
```

### Customization

You can customize the appearance of the pagination component using CSS variables:

- **--pagination-button-color**: Color of the pagination buttons.
- **--pagination-button-background**: Background color of the pagination buttons.
- **--pagination-button-border-radius**: Border radius of the pagination buttons.
- **--pagination-button-padding**: Padding inside the pagination buttons.
- **--pagination-button-active-background**: Background color of the active page button.
- **--pagination-button-disabled-color**: Color of the disabled buttons.

To update the values, use the following:

```css
ip-pagination {
  --primary-color
  --text-active-color
}
```

## Events

The `ip-pagination` component emits the following event:

### `pageChanged`

The `pageChanged` event is fired when the user changes the page from the component (click or keyboard). The event detail is the new page number.

It is not fired when `currentPage` (or `totalPages`) is set by your code, so you can update `currentPage` from a listener without creating a loop.

_e.g:_

```javascript
const pagination = document.querySelector('ip-pagination');

pagination.addEventListener('pageChanged', (event) => {
  const newPage = event.detail;
  console.log('Page changed to:', newPage);
});
```
