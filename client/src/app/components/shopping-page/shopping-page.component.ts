import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../navbar-categories/navbar-categories.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { Subscription } from 'rxjs';

interface SearchResult {
  product: Array<Product>;
  status: boolean;
}

export interface Product {
  _id: string;
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

  public products: Array<Product>
  public searchText: string;
  public unsubscribeSearchTextChanges: Subscription;
  public noSearchResults: boolean = false;
  public initCategory = {
    _id: "5e5ae45a82745acbeca9e635",
    category : "Milk & Eggs"
  } 
  constructor(private productsService: ProductsService) { }


  ngOnInit(): void {

    this.getProductsByCategory(this.initCategory)



     this.unsubscribeSearchTextChanges = this.productsService.searchTextChanges.subscribe((newValue: string) =>{
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
        console.log(error);
      }) 
     })
  }
  
  getProductsByCategory(category: Category) {
    this.productsService.getProductsByCategory(category).subscribe((result: ProductsResult) => {
      const { products } = result;
      this.products = products;
      console.log(products);
    }, error => {
      console.log(error.message);
    });
  };
  
  ngOnDestroy() {
    this.unsubscribeSearchTextChanges.unsubscribe();
  };


};