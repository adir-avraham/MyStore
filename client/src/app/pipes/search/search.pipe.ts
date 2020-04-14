import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/components/shopping-page/shopping-page.interfaces';


@Pipe({
  name: 'search'
})


export class SearchPipe implements PipeTransform {

  constructor() {}

  transform(items: Array<Product>, searchText: string): unknown {
    if (!searchText) return items;
    if (!Array.isArray(items)) return [];
    
    return items.filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLocaleLowerCase())
    })

  }

};