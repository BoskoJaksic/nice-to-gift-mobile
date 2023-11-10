import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";

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
    return this.apiService.patch('Orders/status', data);
  }

}
