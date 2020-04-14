import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { SelectedProduct } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';



export interface CartResult {
  cart: Array<CartItem>;
  status: boolean;
}


export interface CartItem {
  _id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  cart_id: string;
  product_id?: string;
  image?: string;
}

export interface AddedProduct {
  product_id: string;
  quantity: number;
  cart_id: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit, OnDestroy {
  
  displayedColumns: string[] = ['image', 'item', 'quantity', 'price', 'remove'];
  panelOpenState = false;
  cartItems: Array<CartItem> = [];
  selectedProductSub: Subscription;
  constructor(private cartService: CartService, private router: Router, private sidebarService: SidebarService) { }


  ngOnInit(): void {
    
    this.cartService.getCart().subscribe((cartResult: CartResult) => {
      const { cart } = cartResult;
      this.cartItems = cart;
      this.cartService.totalQuantity.next(this.getTotalCartItems());
    }, error =>{
      console.log(error.message);
    });


    this.selectedProductSub = this.cartService.selectedProduct.subscribe((selectedProduct: SelectedProduct ) => {

      const addedProduct: AddedProduct = {
        product_id: selectedProduct.product_id,
        quantity: selectedProduct.quantity,
        cart_id: this.cartItems[0].cart_id
      }

      this.cartService.addProductToCart(addedProduct).subscribe((cartResult: CartResult) => {
          const { cart, status } = cartResult;
          if (!status) return;
          this.cartItems = cart;
          this.cartService.totalQuantity.next(this.getTotalCartItems());
      }, error =>{
        console.log(error.message);
      });

    }, error =>{
      console.log(error.message);
    });

  }

  
  getTotalCost() {
    return this.cartItems.map(item => item.price).reduce((acc, value) => acc + value, 0);
  }

  getTotalCartItems() {
    return this.cartItems.map(item => item.quantity).reduce((acc, value) => acc + value, 0);
  }

  deleteCartItem(item_id: string) {

    this.cartService.deleteCartItem(item_id).subscribe((cartResult: CartResult) => {
      const { cart, status } = cartResult;
      if (!status) return;
      this.cartItems = cart;
      this.cartService.totalQuantity.next(this.getTotalCartItems());
  }, error =>{
    console.log(error.message);
  });
    
}

emptyCart(cart_id: string) {
  this.cartService.emptyCart(cart_id).subscribe((cartResult: CartResult) =>{
    const { cart, status} = cartResult;
    if (!status) return;
    this.cartItems = cart;
    this.cartService.totalQuantity.next(this.getTotalCartItems());
  }, error =>{
    console.log(error.message);
  })
}

checkout() {
  this.router.navigate(['/checkout']);
}

closeSideBar() {
  this.sidebarService.openSidebar.next(false);
};

ngOnDestroy() {
  this.selectedProductSub.unsubscribe();
}


}