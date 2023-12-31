import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {ShopModel} from "../model/shops/shop.model";
import {ShopReviewModel} from "../model/shops/shop-review.model";
import {GetShopReviewModel} from "../model/shops/get-shop-review.model";

@Injectable({
  providedIn: 'root'
})
export class ShopApiServices {

  constructor(private apiService: ApiService) {
  }

  get10Shops(): Observable<ShopModel> {
    return this.apiService.get('Shops?Page=1&Size=10');
  }

  getTopRatedShops(): Observable<ShopModel> {
    return this.apiService.get('Shops?SortBy=averageRating&SortOrder=1&Page=1&Size=10&TotalItems=10');
  }

  getAllShops(url: string): Observable<ShopModel> {
    return this.apiService.get(url);
  }
  getAllShopsUnfiltered(): Observable<any> {
    return this.apiService.get('Shops');
  }

  searchShop(url: string): Observable<ShopModel> {
    return this.apiService.get(url);
  }

  getSingleShopDetails(id: string): Observable<ShopModel> {
    return this.apiService.get(`Shops/${id}`);
  }

  getFeeAmount(): Observable<any> {
    return this.apiService.get('Shops/fee');
  }

  postShopReview(data: ShopReviewModel): Observable<ShopReviewModel> {
    return this.apiService.post('Shops/review', data);
  }

  getShopReview(shopId: string,page:number): Observable<GetShopReviewModel> {
    return this.apiService.get(`Shops/reviews?ShopId=${shopId}&Page=${page}&Size=10&sortBy=CreatedAt&sortOrder=1`);
  }
}
