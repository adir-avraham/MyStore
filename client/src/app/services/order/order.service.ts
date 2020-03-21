import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { basedUrl } from '../../sharing-url/sharing.url';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  getUserCityUrl = `${basedUrl}/getUserDetails/city`;
  getUserStreetUrl = `${basedUrl}/getUserDetails/street`;
  getUnavailableDatesUrl = `${basedUrl}/getUnavailableDates`;
  saveNewOrderUrl = `${basedUrl}/saveNewOrder`;

  constructor(private httpClient: HttpClient) { }

  getUserCity() {
    return this.httpClient.get(this.getUserCityUrl);
  }

  getUserStreet() {
    return this.httpClient.get(this.getUserStreetUrl);
  }

  getUnavailableDates() {
    return this.httpClient.get(this.getUnavailableDatesUrl);
  }

  saveNewOrder(newOrder) {
    return this.httpClient.post(this.saveNewOrderUrl, newOrder);
  }

}