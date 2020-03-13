import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/components/navbar-categories/navbar-categories.component';
import { Product } from 'src/app/components/shopping-page/shopping-page.component';
import { Subject } from 'rxjs';

export interface ProductsResult {
  products: Array<Product>;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  public searchTextChanges: Subject<string>

  constructor(private httpClient: HttpClient) { 
    this.searchTextChanges = new Subject<string>();
  }


  getProductsByCategory(category: Category) {
    const { _id } = category;
    return this.httpClient.get(`http://localhost:4000/getProductsByCategory/${_id}`);
  };

  getProductByName(name: string) {
    return this.httpClient.get(`http://localhost:4000/getProductByName/${name}`);
  };

  setSearchTextChanges(newValue: string) {
    //if (!newValue) return;
    this.searchTextChanges.next(newValue);
  };


};