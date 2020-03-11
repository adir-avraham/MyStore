import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';


export interface Category {
  _id: string;
  category: string;
}

interface Result {
  categories: Array<Category>;
  stauts: boolean;
}

@Component({
  selector: 'app-navbar-categories',
  templateUrl: './navbar-categories.component.html',
  styleUrls: ['./navbar-categories.component.css']
})


export class NavbarCategoriesComponent implements OnInit {

  public isMenuCollapsed = true;
  public categories: Array<Category>; 

  @Output() productsByCategory = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
     
    this.categoriesService.getCategories().subscribe((result: Result) => {
      const { categories } = result
      this.categories = categories; 
    }, error =>{
      console.log(error.message);
    })
  }

  getProductsByCategory(category: Category) {
    this.isMenuCollapsed = true;
    this.productsByCategory.emit(category);
  }


}
