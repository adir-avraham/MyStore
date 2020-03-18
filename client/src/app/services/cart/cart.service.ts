import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AddedProduct } from '../../components/cart/cart.component'

const basedUrl = "http://localhost:4000";

export interface SelectedProduct {
  quantity: number;
  product_id: string;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public getCartUrl = `${basedUrl}/getCart`;
  public addToCartUrl = `${basedUrl}/addCartItem`;
  public deleteCartItemUrl = `${basedUrl}/deleteCartItem`;

  selectedProduct = new Subject<SelectedProduct>();

  constructor(private httpClient: HttpClient ) { }

  getCart() {
    return this.httpClient.get(this.getCartUrl);
  }

  addProductToCart(addedProduct: AddedProduct) {
    return this.httpClient.post(this.addToCartUrl, addedProduct);
  }

  deleteCartItem(item_id: string) {
    return this.httpClient.delete(`${this.deleteCartItemUrl}/${item_id}`);
  }
}
