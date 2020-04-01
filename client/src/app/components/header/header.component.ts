import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, Decoded } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart/cart.service';
import * as jwtDecode from 'jwt-decode'; 

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
  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (!user) return;
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

  };

  logout() {
    this.authService.logout();
    this.adminConnected = null;
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.showCartIndicatorSub.unsubscribe();
  }

};