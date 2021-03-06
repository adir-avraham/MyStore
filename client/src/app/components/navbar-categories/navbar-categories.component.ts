import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category, CategoriesRes } from './categories.interfaces';


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
      const { categories } = result;
      this.categories = categories; 
    }, error =>{
      console.log(error.message);
    })
  };

  getProductsByCategory(category: Category) {
    this.productsByCategory.emit(category);
  };

};