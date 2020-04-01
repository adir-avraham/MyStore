import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AddedProduct } from '../../components/cart/cart.component'
import { basedUrl } from 'src/app/sharing-url/sharing.url';



export interface SelectedProduct {
  quantity: number;
  product_id: string;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public getShoppingDetailsUrl = `${basedUrl}/getUserDetails/shopping`;
  public getCartUrl = `${basedUrl}/getCart`;
  public addToCartUrl = `${basedUrl}/addCartItem`;
  public deleteCartItemUrl = `${basedUrl}/deleteCartItem`;
  public emptyCartUrl = `${basedUrl}/emptyCart`;

  selectedProduct = new Subject<SelectedProduct>();
  openSideCart = new Subject<boolean>();
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