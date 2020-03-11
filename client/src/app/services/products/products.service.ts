import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/components/navbar-categories/navbar-categories.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  constructor(private httpClient: HttpClient) { }



  getProductsByCategory(category: Category) {
    const { _id } = category;
    return this.httpClient.get(`http://localhost:4000/getProductsByCategory/${_id}`);
  }

}
