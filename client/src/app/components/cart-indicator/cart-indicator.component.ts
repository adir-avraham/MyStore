import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-cart-indicator',
  templateUrl: './cart-indicator.component.html',
  styleUrls: ['./cart-indicator.component.css']
})
export class CartIndicatorComponent implements OnInit, OnDestroy {

  public openSidebar: boolean;
  public totalCartItems: number = null;
  public totalQuantitySub: Subscription;
  public openSidebarSub: Subscription;

  constructor(private cartService: CartService, private sidebarService: SidebarService) { }

  ngOnInit(): void {

    this.totalQuantitySub = this.cartService.totalQuantity.subscribe((totalQuantity: number) => {
      this.totalCartItems = totalQuantity;
    })

    this.openSidebarSub = this.sidebarService.openSidebar.subscribe((openSidebar: boolean) => {
      this.openSidebar = openSidebar;
    });

  }

  showCart() {
    this.openSidebar = !this.openSidebar;
    this.sidebarService.openSidebar.next(this.openSidebar);
  }

  ngOnDestroy() {
    this.totalQuantitySub.unsubscribe();
    this.openSidebarSub.unsubscribe();
  }

};