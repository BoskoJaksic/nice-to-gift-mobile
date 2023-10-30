import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../shared/services/storage.service";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ShopModel} from "../../../shared/model/shops/shop.model";

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
  shops: ShopModel[] = [];
  userName: string = ''

  constructor(private storageService: StorageService, private shopApiService: ShopApiServices) {
  }

  async ngOnInit() {
    this.userName = await this.storageService.getItem('userName')
    this.getShops()
  }

  getShops(): void {
    this.shopApiService.get10Shops().subscribe(
      (shops: any) => {
        this.shops = shops.data
        console.log(shops);
      },
      (error: any) => {
        // Handle errors if any
        console.error(error);
      }
    );
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getShops()
      event.target.complete();
    }, 2000);
  }
}
