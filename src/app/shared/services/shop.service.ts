import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  singleShopId: string = '';


  setShopId(id: string): void {
    this.singleShopId = id;
  }

  getShopId(): string {
    return this.singleShopId;
  }

}
