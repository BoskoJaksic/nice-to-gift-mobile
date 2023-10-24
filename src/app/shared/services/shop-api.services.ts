import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {ShopModel} from "../model/shop.model";

@Injectable({
  providedIn: 'root'
})
export class ShopApiServices {

  constructor(private apiService: ApiService) {
  }

  get10Shops(): Observable<ShopModel> {
    return this.apiService.get('Shop?Page=1&Size=10');
  }

  getTopRatedShops(): Observable<ShopModel> {
    return this.apiService.get('Shop?SortBy=averageRating&SortOrder=1&Page=1&Size=10&TotalItems=10');
  }

  getAllShops(url: string): Observable<ShopModel> {
    return this.apiService.get(url);
  }

  getSingleShopDetails(id: string): Observable<ShopModel> {
    return this.apiService.get(`Shop/${id}`);
  }

  getFeeAmount(): Observable<any> {
    return this.apiService.get('shops/fee');
  }
}
