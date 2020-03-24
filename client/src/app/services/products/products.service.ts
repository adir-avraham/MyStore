import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/components/navbar-categories/navbar-categories.component';
import { Product } from 'src/app/components/shopping-page/shopping-page.component';
import { Subject } from 'rxjs';
import { basedUrl } from 'src/app/sharing-url/sharing.url';

export interface ProductsResult {
  products: Array<Product>;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  public searchTextChanges: Subject<string>
  getNumOfProductsUrl = `${basedUrl}/getStoreStatistics/products`;
  getProductsByCategoryUrl = `${basedUrl}/getProductsByCategory`;
  getProductByNameUrl = `${basedUrl}/getProductByName`;

  constructor(private httpClient: HttpClient) { 
    this.searchTextChanges = new Subject<string>();
  }

  getNumOfProducts() {
    return this.httpClient.get(this.getNumOfProductsUrl);
  }


  getProductsByCategory(category: Category) {
    const { _id } = category;
    return this.httpClient.get(`${this.getProductsByCategoryUrl}/${_id}`);
  };

  getProductByName(name: string) {
    return this.httpClient.get(`${this.getProductByNameUrl}/${name}`);
  };

  setSearchTextChanges(newValue: string) {
    this.searchTextChanges.next(newValue);
  };


};