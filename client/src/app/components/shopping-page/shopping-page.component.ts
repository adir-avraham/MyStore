import { Component, OnInit } from '@angular/core';
import { Category } from '../navbar-categories/navbar-categories.component';
import { ProductsService } from 'src/app/services/products/products.service';


interface Product {
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



export class ShoppingPageComponent implements OnInit {

  public products: Array<Product>

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  getProductsByCategory(category: Category) {
    this.productsService.getProductsByCategory(category).subscribe((result: ProductsResult) => {
      const { products } = result;
      this.products = products;
      console.log(products);
    }, error => {
      console.log(error.message);
    })
  }

}
