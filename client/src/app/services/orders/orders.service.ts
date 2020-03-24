import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { basedUrl } from '../../sharing-url/sharing.url';
import { SavedOrderIds } from 'src/app/components/order/order.component';

interface NewOrder {
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: Date | string;
  creditCard: number | string;
}



@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  getNumOfOrdersUrl = `${basedUrl}/getStoreStatistics/orders`;
  getUserCityUrl = `${basedUrl}/getUserDetails/city`;
  getUserStreetUrl = `${basedUrl}/getUserDetails/street`;
  getUnavailableDatesUrl = `${basedUrl}/getUnavailableDates`;
  saveNewOrderUrl = `${basedUrl}/saveNewOrder`;
  downloadReceiptUrl = `${basedUrl}/downloadReceipt`;
  
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

}