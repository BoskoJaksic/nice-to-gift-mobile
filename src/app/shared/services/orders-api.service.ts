import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {OrderModel} from "../model/orders/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(private apiService: ApiService) {
  }

  makeOrder(data: any): Observable<any> {
    return this.apiService.post('Orders', data);
  }

  updateOrder(data: any): Observable<any> {
    return this.apiService.patch('Orders/payment-status', data);
  }

  getGivenOrders(senderId: any): Observable<OrderModel> {
    return this.apiService.get(`Orders/regular-user?SenderId=${senderId}`);
  }

  getReceivedOrders(receiverId: any): Observable<OrderModel> {
    return this.apiService.get(`Orders/regular-user?ReceiverId=${receiverId}`);
  }

  updateOrderReceiver(data: any): Observable<any> {
    return this.apiService.patch(`Orders/receiver`, data);
  }

  getSingleOrder(orderId: any): Observable<any> {
    return this.apiService.get(`Orders/${orderId}`);
  }
}
