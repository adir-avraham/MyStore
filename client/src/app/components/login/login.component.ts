import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, Decoded } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import * as jwtDecode from 'jwt-decode'; 
import { CartService } from 'src/app/services/cart/cart.service';
import moment from 'moment/src/moment';
import { Subscription } from 'rxjs';

interface loginRes {
  message: string;
  status: boolean;  
  userData: UserData
}

interface UserData {
  firstName: string; 
  role: string; 
  _id: string;
  token: string;
}

interface ShoppingDetailsRes {
  shoppingDetails: any;
  status: boolean;
}

interface OpenCart {
  totalPrice: number;
  created_at: Date;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public errorMessage: string = null;
  public isAuthenticated: boolean = false;
  public isAdminConnected: boolean = false;
  public isUserConnected: boolean = false;
  public welcomeMessage: string = null;
  public openCart: OpenCart = null;
  public userSubscription: Subscription;
  public userName: string = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
    private router: Router, private cartService: CartService) {
    this.loginForm = this.formBuilder.group({
      userName: null, 
      password: null 
    })
  };


  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      this.cartService.showCartIndicator.next(false)
      if (user) {
        this.isAuthenticated = true;
        const { token, firstName } = user;
        this.userName = firstName;
        const decoded: Decoded = jwtDecode(token);       
        const { role } = decoded._doc;
        if ( role === 'admin' ) {
          this.isAdminConnected = true;
        } else if (role === 'user') {
          this.isUserConnected = true;   
          this.cartService.getShoppingDetails().subscribe((shoppingDetailsRes: ShoppingDetailsRes) => {
            const { shoppingDetails } = shoppingDetailsRes;
            const { ordered_at, totalPrice, created_at } = shoppingDetailsRes.shoppingDetails;   
            if (!shoppingDetails.length && !totalPrice) {
              this.welcomeMessage = "Welcome to your first purchase!"
            }
            if (shoppingDetails.length) {  
              this.welcomeMessage = `Last order: ${moment(ordered_at).format('DD-MM-YYYY')} `
            } 
            if (totalPrice) {
              const openCart = {
                totalPrice: totalPrice,
                created_at: moment(created_at).format('DD-MM-YYYY')
              }
              this.openCart = openCart; 
            }
          })}      
        } else {
        this.isAuthenticated = false;
        this.isUserConnected = false;
        this.isAdminConnected = false;
        this.userName = null;
        this.welcomeMessage = null;
        this.openCart = null;
      }
    });
  };

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    
    this.authService.login(userName, password).subscribe((loginRes: loginRes) => {
      const {message, status, userData } = loginRes;
        if (status) {
          this.isAuthenticated = true;
          this.userLoggedin(userData);
        }
        if (message && !status) {
        this.errorMessage = message;
        }
    }, error =>{
      console.log(error.message)
      this.errorMessage = "Somethins went wrong..";
    });
  };


  userLoggedin(userData: UserData) {
    const { role } = userData;
    if (role === 'admin') {
      this.isAdminConnected = true;
      this.isAuthenticated = true;
      return this.router.navigate(['/shopping-page']);
    } else {
      this.isUserConnected = true;
      this.isAuthenticated = true;
    }
  }


  goToShoppingPage() {
    this.router.navigate(['/shopping-page']);
  };


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  };


};