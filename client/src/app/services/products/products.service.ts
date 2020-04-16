import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/components/navbar-categories/categories.interfaces';
import { Product } from 'src/app/components/shopping-page/shopping-page.interfaces';
import { Subject } from 'rxjs';
import { baseUrl } from 'src/app/sharing-url/sharing.url';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  
  public products = new Subject<Array<Product>>();
  public selectedProduct = new Subject<Product>();
  public getNumOfProductsUrl = `${baseUrl}/statistics/getNumOfProducts`;
  public getProductsByCategoryUrl = `${baseUrl}/products/getProductsByCategory`;
  public createProductUrl = `${baseUrl}/admin/products/createProduct`;
  public editProductUrl = `${baseUrl}/admin/products/editProduct`;

  constructor(private httpClient: HttpClient) { }

  getNumOfProducts() {
    return this.httpClient.get(this.getNumOfProductsUrl);
  };

  getProductsByCategory(category: Category) {
    const { _id } = category;
    return this.httpClient.get(`${this.getProductsByCategoryUrl}/${_id}`);
  };

  createProduct(newProduct: Product) {
    return this.httpClient.post(this.createProductUrl, newProduct);
  };

  editProduct(editedProduct: Product) {
    return this.httpClient.put(this.editProductUrl, editedProduct);
  };

};