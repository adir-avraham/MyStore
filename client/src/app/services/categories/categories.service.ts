import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { basedUrl } from 'src/app/sharing-url/sharing.url';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public getCategoriesUrl = `${basedUrl}/getCategories`;

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get(this.getCategoriesUrl);
  }

}
