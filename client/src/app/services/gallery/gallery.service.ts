import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpClient: HttpClient) { }
  
  searchImages(productNameParam: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic VDFDVXFCUzB5aW5LVWhLcjhudWw1b0JkZ2hhZkl6VHI6TWZUWFM4cHR1dnY1WnhNUg==');
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.get(`https://api.shutterstock.com/v2/images/search?view=minimal&category=Food and Drink&image_type=photo&per_page=30&people_number=0&query=${productNameParam}&sort=popular&spellcheck_query=true`, {headers: headers});
  };


};