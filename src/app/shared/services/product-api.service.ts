import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {ShopModel} from "../model/shop.model";
import {ProductModel} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private apiService: ApiService) {
  }


  getAllShopProducts(url: string): Observable<ProductModel> {
    return this.apiService.get(url);
  }
}
