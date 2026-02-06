import { newSpecPage } from 'jest-stencil-runner';
import { IpTable } from './table';

describe('ip-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IpTable],
      html: '<ip-table></ip-table>',
    });
    expect(page.root).toEqualHtml(`
            <ip-table>
                <mock:shadow-root>
                    <table  >
                        <thead>
                            <tr></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </mock:shadow-root>
            </ip-table>
        `);
  });

  it('renders table with headers and rows', async () => {
    const page = await newSpecPage({
      components: [IpTable],
      html: `
      <ip-table
        columns='[
          { "header": "Name" , "type": "string"},
          { "header": "Age", "type": "number" }
        ]'
        rows='[
          {"Name":"Alice", "Age":25},
          {"Name":"Bob", "Age":30}
        ]'
      ></ip-table>
      `,
    });

    expect(page.root).toEqualHtml(`
    <ip-table
        columns='[
          { "header": "Name" , "type": "string"},
          { "header": "Age", "type": "number" }
        ]'
        rows='[
          {"Name":"Alice", "Age":25},
          {"Name":"Bob", "Age":30}
        ]'
      >
        <mock:shadow-root>
         <table  >
          <thead>
            <tr>
              <th>
                <button class="table-header" >
                  Name
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden="true">
                    <path d="M13.9618 5.80875C13.924 5.71738 13.8599 5.63928 13.7777 5.58432C13.6955 5.52936 13.5988 5.50002 13.4999 5.5H3.49991C3.40096 5.49992 3.30421 5.5292 3.22191 5.58414C3.13962 5.63908 3.07547 5.71719 3.03759 5.8086C2.99972 5.90002 2.98982 6.00061 3.00914 6.09765C3.02847 6.1947 3.07615 6.28382 3.14616 6.35375L8.14616 11.3538C8.19259 11.4002 8.24774 11.4371 8.30844 11.4623C8.36913 11.4874 8.4342 11.5004 8.49991 11.5004C8.56561 11.5004 8.63068 11.4874 8.69138 11.4623C8.75207 11.4371 8.80722 11.4002 8.85366 11.3538L13.8537 6.35375C13.9236 6.28379 13.9711 6.19466 13.9904 6.09765C14.0096 6.00064 13.9997 5.9001 13.9618 5.80875Z" fill="white">
                    </path>
                  </svg>
                 </button>

              </th>
              <th>
                <button class="table-header" >
                  Age
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden="true">
                      <path d="M13.9618 5.80875C13.924 5.71738 13.8599 5.63928 13.7777 5.58432C13.6955 5.52936 13.5988 5.50002 13.4999 5.5H3.49991C3.40096 5.49992 3.30421 5.5292 3.22191 5.58414C3.13962 5.63908 3.07547 5.71719 3.03759 5.8086C2.99972 5.90002 2.98982 6.00061 3.00914 6.09765C3.02847 6.1947 3.07615 6.28382 3.14616 6.35375L8.14616 11.3538C8.19259 11.4002 8.24774 11.4371 8.30844 11.4623C8.36913 11.4874 8.4342 11.5004 8.49991 11.5004C8.56561 11.5004 8.63068 11.4874 8.69138 11.4623C8.75207 11.4371 8.80722 11.4002 8.85366 11.3538L13.8537 6.35375C13.9236 6.28379 13.9711 6.19466 13.9904 6.09765C14.0096 6.00064 13.9997 5.9001 13.9618 5.80875Z" fill="white">
                      </path>
                    </svg>
                </button>

              </th>
            </tr>
         </thead>
         <tbody>
            <tr>
              <td>Alice</td>
              <td>25</td>
            </tr>
            <tr>
              <td>Bob</td>
              <td>30</td>
            </tr>
          </tbody>
         </table>
        </mock:shadow-root>
    </ip-table>
    `);
  });
});
