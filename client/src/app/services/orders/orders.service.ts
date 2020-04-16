import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { baseUrl } from '../../sharing-url/sharing.url';
import { SavedOrderIds, NewOrder } from 'src/app/components/order/order.interfaces';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  public getNumOfOrdersUrl = `${baseUrl}/statistics/getNumOfOrders`;
  public getUserCityUrl = `${baseUrl}/getUserDetails/city`;
  public getUserStreetUrl = `${baseUrl}/getUserDetails/street`;
  public getUnavailableDatesUrl = `${baseUrl}/orders/getUnavailableDates`;
  public saveNewOrderUrl = `${baseUrl}/orders/saveNewOrder`;
  public downloadReceiptUrl = `${baseUrl}/downloadReceipt`;
  public isOrderSaved = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  getNumOfOrders() {
    return this.httpClient.get(this.getNumOfOrdersUrl);
  }

  getUserCity() {
    return this.httpClient.get(this.getUserCityUrl);
  }

  getUserStreet() {
    return this.httpClient.get(this.getUserStreetUrl);
  }

  getUnavailableDates() {
    return this.httpClient.get(this.getUnavailableDatesUrl);
  }

  saveNewOrder(newOrder: NewOrder) {
    return this.httpClient.post(this.saveNewOrderUrl, newOrder);
  }

  downloadReceipt(savedOrderIds: SavedOrderIds) {
    const { cartId, orderId } = savedOrderIds;
    let searchParams = new HttpParams();
    searchParams = searchParams.append('cartId', cartId);
    searchParams = searchParams.append('orderId', orderId);
    return this.httpClient.get(this.downloadReceiptUrl, {params: searchParams , responseType: 'text'});
  }

};