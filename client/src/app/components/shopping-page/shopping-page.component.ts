import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../navbar-categories/navbar-categories.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';


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
  public initCategory = {_id: "5e5ae45a82745acbeca9e635", category : "Milk & Eggs"}; 
  public unsubscribeProducts: Subscription;
  public sidenav: MatSidenav;
  public drawer: MatDrawer;
  public opened: boolean;

  constructor(private productsService: ProductsService, private dialog: MatDialog,
    private cartService: CartService) { }


  ngOnInit(): void {
    
    this.getProductsByCategory(this.initCategory);
    
    this.unsubscribeProducts = this.productsService.products.subscribe((products: Array<Product>) => {
      this.products = products;
    });
    
    this.unsubscribeSearchTextChanges = this.productsService.searchTextChanges.subscribe((newValue: string) => {
      this.searchText = newValue;
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
        this.getProductsByCategory(this.initCategory);
        console.log(error.message);
      }) 
    })
  };
  
    getProductsByCategory(category: Category) {
      this.productsService.getProductsByCategory(category).subscribe((result: ProductsResult) => {
        const { products } = result;
        this.products = products;
      }, error => {
        console.log(error.message);
    });
  
  };
  
  
  addProductToCart(product: Product) {
    const dialogRef = this.dialog.open(DialogComponent, {data: {
      name: product.name
    }})
    dialogRef.afterClosed().subscribe((quantity: number) => {
      const selectedProduct = {quantity: quantity, product_id: product._id };
      this.cartService.selectedProduct.next(selectedProduct);
    })
  };


  editProduct(product: Product) {
    this.productsService.selectedProduct.next(product);
    this.opened = true;
  };

  
  execOnClose() {
    this.opened = false;
  };

  ngOnDestroy() {
    this.unsubscribeSearchTextChanges.unsubscribe();
    this.unsubscribeProducts.unsubscribe();
  };


};