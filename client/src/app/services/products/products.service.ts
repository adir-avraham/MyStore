import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from 'src/app/components/navbar-categories/navbar-categories.component';
import { Product } from 'src/app/components/shopping-page/shopping-page.component';
import { Subject } from 'rxjs';
import { basedUrl } from 'src/app/sharing-url/sharing.url';

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
  
  public getNumOfProductsUrl = `${basedUrl}/getStoreStatistics/products`;
  public getProductsByCategoryUrl = `${basedUrl}/getProductsByCategory`;
  public getProductByNameUrl = `${basedUrl}/getProductByName`;
  public createProductUrl = `${basedUrl}/admin/createProduct`;
  public editProductUrl = `${basedUrl}/admin/editProduct`;

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


  getProductImage(productQueqry: string) {
    let headers = new HttpHeaders()
    headers = headers.append('Authorization', 'Basic VDFDVXFCUzB5aW5LVWhLcjhudWw1b0JkZ2hhZkl6VHI6TWZUWFM4cHR1dnY1WnhNUg==');
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.get(`https://api.shutterstock.com/v2/images/search?query=${productQueqry}`, {headers: headers});
  };


};