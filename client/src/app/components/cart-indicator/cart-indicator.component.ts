import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-indicator',
  templateUrl: './cart-indicator.component.html',
  styleUrls: ['./cart-indicator.component.css']
})
export class CartIndicatorComponent implements OnInit, OnDestroy {

  public openSideCart: boolean = false;
  public totalCartItems: number = null;
  public totalQuantitySub: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.totalQuantitySub = this.cartService.totalQuantity.subscribe((totalQuantity: number) => {
      this.totalCartItems = totalQuantity;
    })

  }

  showCart() {
    this.openSideCart = !this.openSideCart;
    this.cartService.openSideCart.next(this.openSideCart);
  }

  ngOnDestroy() {
    this.totalQuantitySub.unsubscribe();
  }

};