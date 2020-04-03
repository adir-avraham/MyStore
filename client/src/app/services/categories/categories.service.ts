import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/sharing-url/sharing.url';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public getCategoriesUrl = `${baseUrl}/getCategories`;

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get(this.getCategoriesUrl);
  }

}
