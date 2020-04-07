import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';


export interface Category {
  _id: string;
  category: string;
}

export interface CategoriesRes {
  categories: Array<Category>;
  stauts: boolean;
}

@Component({
  selector: 'app-navbar-categories',
  templateUrl: './navbar-categories.component.html',
  styleUrls: ['./navbar-categories.component.css']
})


export class NavbarCategoriesComponent implements OnInit {

  public categories: Array<Category>; 

  @Output() productsByCategory = new EventEmitter<Category>();
  @Output() getAllProducts = new EventEmitter();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
     
    this.categoriesService.getCategories().subscribe((result: CategoriesRes) => {
      const { categories } = result
      this.categories = categories; 
    }, error =>{
      console.log(error.message);
    })
  }

  getProductsByCategory(category: Category) {
    this.productsByCategory.emit(category);
  }

  getProducts() {
    this.getAllProducts.emit();
  }

}
