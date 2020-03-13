import { Pipe, PipeTransform } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/components/shopping-page/shopping-page.component';

interface SearchResult {
  product: Array<Product>;
  status: boolean;
}


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private productsService: ProductsService) {}

  transform(items: unknown, searchText: string): unknown {
    if (!searchText) return [];
    if (!Array.isArray(items)) return [];
    
    return this.productsService.getProductByName(searchText).subscribe((result: SearchResult) =>{
      const { product } = result;
      console.log(product)
      
      if (!Array.isArray(product)) return [];

      return product;
    })
  }

}
