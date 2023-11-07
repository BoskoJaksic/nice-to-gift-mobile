import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {CardModel} from "../model/payment/card.model";

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private apiService: ApiService) {
  }

  createCard(data: any): Observable<any> {
    return this.apiService.post('Orders/payment-method', data);
  }
  initiatePayment(data: any): Observable<any> {
    return this.apiService.post('Orders/initiate-payment', data);
  }

  getCustomerCards(customerEmail: any): Observable<any> {
    return this.apiService.get(`Orders/payment-method/${customerEmail}`);
  }

}
