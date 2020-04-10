import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AddedProduct } from '../../components/cart/cart.component'
import { baseUrl } from 'src/app/sharing-url/sharing.url';



export interface SelectedProduct {
  quantity: number;
  product_id: string;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public getShoppingDetailsUrl = `${baseUrl}/getUserDetails/shopping`;
  public getCartUrl = `${baseUrl}/carts/getCart`;
  public addToCartUrl = `${baseUrl}/carts/addCartItem`;
  public deleteCartItemUrl = `${baseUrl}/carts/deleteCartItem`;
  public emptyCartUrl = `${baseUrl}/carts/emptyCart`;

  selectedProduct = new Subject<SelectedProduct>();
  totalQuantity = new Subject<number>();
  showCartIndicator = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  getShoppingDetails() {
    return this.httpClient.get(this.getShoppingDetailsUrl);
  }  
  
  getCart() {
    return this.httpClient.get(this.getCartUrl);
  }

  addProductToCart(addedProduct: AddedProduct) {
    return this.httpClient.post(this.addToCartUrl, addedProduct);
  }

  deleteCartItem(item_id: string) {
    return this.httpClient.delete(`${this.deleteCartItemUrl}/${item_id}`);
  }

  emptyCart(cart_id: string) {
    return this.httpClient.delete(`${this.emptyCartUrl}/${cart_id}`);
  }

};