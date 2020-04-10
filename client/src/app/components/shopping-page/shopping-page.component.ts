import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category, CategoriesRes } from '../navbar-categories/navbar-categories.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog-add/dialog.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';
import { AuthService, Decoded } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import * as jwtDecode from 'jwt-decode'; 
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

interface SearchResult {
  product: Array<Product>;
  status: boolean;
}

export interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  category_id: string;
}

interface ProductsResult {
  products: Array<Product>;
  status: boolean;
}

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})


export class ShoppingPageComponent implements OnInit, OnDestroy {

  public products: Array<Product>;
  public searchText: string;
  public unsubscribeSearchTextChanges: Subscription;
  public noSearchResults: boolean = false;
  public unsubscribeProducts: Subscription;
  public sidenav: MatSidenav;
  public drawer: MatDrawer;
  public opened: boolean;
  public showCartIndicator: boolean = false;
  public showCartIndicatorSub: Subscription;
  public openSidebarSub: Subscription;

  constructor(private productsService: ProductsService, private dialog: MatDialog,
    private cartService: CartService, private authService: AuthService, 
    private sidebarService: SidebarService, private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    
    this.categoriesService.getCategories().subscribe((result: CategoriesRes) => {
      const { categories } = result 
      this.getProductsByCategory(categories[0]);
    }, error =>{
      console.log(error.message);
    })

    this.unsubscribeProducts = this.productsService.products.subscribe((products: Array<Product>) => {
      this.products = products;
    });
    
    this.unsubscribeSearchTextChanges = this.productsService.searchTextChanges.subscribe((newValue: string) => {
      this.searchText = newValue; 
      if (!this.searchText) return;
      this.productsService.getProductByName(newValue).subscribe((result: SearchResult) =>{
        const { product } = result;
        if (!Array.isArray(product)) {
          this.noSearchResults = true;   
        } else {
          this.noSearchResults = false;
          this.products = product;
        }
      }, error => {
        this.noSearchResults = false;
        console.log(error.message);
      }) 
    });


    this.openSidebarSub = this.sidebarService.openSidebar.subscribe((openSidebar: boolean) => {
      this.opened = openSidebar;
    });

    
    this.authService.user.subscribe((user: User) => {
      if (!user) return;
      const { token } = user;
      const decoded: Decoded = jwtDecode(token);       
      const { role } = decoded._doc;
        if (role === 'user') {  
          this.cartService.showCartIndicator.next(true);
        } else {
          this.cartService.showCartIndicator.next(false);
        }   
    });
      
  
  };
  
  
  getProductsByCategory(category: Category) {
    this.productsService.getProductsByCategory(category).subscribe((result: ProductsResult) => {
      const { products } = result;
      this.products = products;
    })
  };
  
  
  addProductToCart(product: Product) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
      name: product.name
    }})
    dialogRef.afterClosed().subscribe((quantity: number) => {
      if (!quantity) return;
      const selectedProduct = {quantity: quantity, product_id: product._id };
      this.cartService.selectedProduct.next(selectedProduct);
    })
  };


  editProduct(product: Product) {
    this.productsService.selectedProduct.next(product);
    this.sidebarService.openSidebar.next(true);
  };

  
  ngOnDestroy() {
    this.unsubscribeSearchTextChanges.unsubscribe();
    this.unsubscribeProducts.unsubscribe();
    this.openSidebarSub.unsubscribe();
  };


};