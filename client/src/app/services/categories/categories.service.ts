import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public getCategoriesUrl = "http://localhost:4000/getCategories";

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get(this.getCategoriesUrl);
  }

}
