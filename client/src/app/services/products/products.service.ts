import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/components/navbar-categories/navbar-categories.component';
import { Product } from 'src/app/components/shopping-page/shopping-page.component';
import { Subject } from 'rxjs';
import { baseUrl } from 'src/app/sharing-url/sharing.url';

export interface ProductsResult {
  products: Array<Product>;
  status: boolean;
}

export interface UpdatedProductsRes {
  createdProduct?: Product;
  message: string;
  products: Array<Product>;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  public searchTextChanges = new Subject<string>();
  public products = new Subject<Array<Product>>();
  public selectedProduct = new Subject<Product>();
  
  public getNumOfProductsUrl = `${baseUrl}/getStoreStatistics/products`;
  public getProductsByCategoryUrl = `${baseUrl}/getProductsByCategory`;
  public getProductByNameUrl = `${baseUrl}/getProductByName`;
  public createProductUrl = `${baseUrl}/admin/createProduct`;
  public editProductUrl = `${baseUrl}/admin/editProduct`;

  constructor(private httpClient: HttpClient) { }

  
  getNumOfProducts() {
    return this.httpClient.get(this.getNumOfProductsUrl);
  };


  getProductsByCategory(category: Category) {
    const { _id } = category;
    return this.httpClient.get(`${this.getProductsByCategoryUrl}/${_id}`);
  };

  
  getProductByName(name: string) {
    return this.httpClient.get(`${this.getProductByNameUrl}/${name}`);
  };

  
  setSearchTextChanges(newValue: string) {
    return this.searchTextChanges.next(newValue);
  };

  
  createProduct(newProduct: Product) {
    return this.httpClient.post(this.createProductUrl, newProduct);
  };


  editProduct(editedProduct: Product) {
    return this.httpClient.put(this.editProductUrl, editedProduct);
  };


};