import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  DOCUMENT
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { defineCustomElements as tableElements } from '@ipedis/table/loader';
import { CodeSnippetComponent } from '../../../features/code-snippet/code-snippet.component';

import { DocTableComponent } from '../doc-table/doc-table.component';
import { AccordionComponent } from '../../../features/accordion/accordion.component';

@Component({
  selector: 'app-table1',
  standalone: true,
  imports: [
    CodeSnippetComponent,
    DocTableComponent,
    AccordionComponent
],
  templateUrl: './table1.component.html',
  styleUrl: './table1.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table1Component {
  codeSnippet = `
<ip-table
    columns='[
    { "header": "Name" , "type": "string"},
    { "header": "Number", "type": "number" },
    { "header": "Category", "type": "string" },
    { "header": "Price" ,"type": "number"},
    { "header": "Status", "type": "string" }
    ]'
  rows='[
    {
    "Name":"Slim Fit chinos",
    "Number" :9504,
    "Category": "Men’s outwear",
    "Price": 98.25,
    "Status": "In Stock"},
    {
    "Name":"Wide-Brimmed Floppy Hat",
    "Number": 9000,
    "Category": "Women’s Outwear",
    "Price": 145.66,
    "Status": "Backorder"},
    {
    "Name":"V-Neck Cashmere Sweater",
    "Number": 9485,
    "Category": "Men’s outwear",
    "Price": 65.00,
    "Status": "Low Stock"},
    {
    "Name":"Striped Off-Shoulder To",
    "Number": 1524,
    "Category": "Women’s Outwear",
    "Price": 56.22,
    "Status": "In Stock"},
    {
    "Name":"Quilted Bomber Jacket",
    "Number": 1235,
    "Category": "Men’s outwear",
    "Price": 14.56,
    "Status": "In Stock"},
    {
    "Name":"Women’s Chescott Down Jacket",
    "Number": 5689,
    "Category": "Women’s Outwear",
    "Price": 100,
    "Status": "Backorder"
    },
    {
    "Name":"Denim Trucker Jacket",
    "Number": 2394,
    "Category": "Men’s outwear",
    "Price": 52.45,
    "Status": "In Stock"},
    {
    "Name":"High-Waisted Skinny Jeans",
    "Number": 7859,
    "Category": "Women’s Outwear",
    "Price": 125.00,"Status": "Low Stock"},
    {
    "Name":"Men’s Harrington Jacket",
    "Number":5600,
    "Category": "Men’s outwear","Price": 150.58,
    "Status": "In Stock"
    }
  ]'
  >
</ip-table>
  `;

  cssTable = `
  ip-table {
   --font-family: 'Mulish-light';
   --primary-color: #b00057;
}
  `;
  switcherTitle = 'Table 1';
  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID)) && tableElements) {
      tableElements(inject(DOCUMENT).defaultView as Window);
    }
  }
}
