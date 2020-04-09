import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, Decoded } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart/cart.service';
import * as jwtDecode from 'jwt-decode'; 
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit, OnDestroy {

  public isAuthenticated = false;
  public adminConnected = null;
  private userSubscription: Subscription;
  public showCartIndicator: boolean = false;
  public showCartIndicatorSub: Subscription;
  public openSidebar: boolean;
  public openSidebarSub: Subscription;

  constructor(private authService: AuthService, private cartService: CartService, 
    private sidebarService: SidebarService) { }

  ngOnInit(): void {
    
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (!user) {
        this.isAuthenticated = false;
        this.adminConnected = null;
        return;
      } 
      const { token } = user;
      const decoded: Decoded = jwtDecode(token);       
      const { role } = decoded._doc;
      this.isAuthenticated = true;
      if (role === 'admin') {
        this.adminConnected = 'Admin';
      }
    })

    this.showCartIndicatorSub = this.cartService.showCartIndicator.subscribe((showCartIndicator: boolean) => {
      this.showCartIndicator = showCartIndicator;
    })

    this.openSidebarSub = this.sidebarService.openSidebar.subscribe((openSidebar: boolean) => {
      this.openSidebar = openSidebar;
    });


  };

  
  logout() {
    this.authService.logout();
  }

  
  showCart() {
    this.openSidebar = !this.openSidebar;
    this.sidebarService.openSidebar.next(this.openSidebar);
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.showCartIndicatorSub.unsubscribe();
    this.openSidebarSub.unsubscribe();
  }

};