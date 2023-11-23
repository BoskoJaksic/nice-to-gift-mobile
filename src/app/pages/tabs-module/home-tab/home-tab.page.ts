import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../shared/services/storage.service";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ShopModel} from "../../../shared/model/shops/shop.model";
import {LoaderService} from "../../../shared/services/loader.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
  shops: ShopModel[] = [];
  userName: string = ''

  constructor(private storageService: StorageService,
              private loaderService: LoaderService,
              private route: ActivatedRoute,
              private shopApiService: ShopApiServices) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.getShops()
    });
  }

  async getShops() {
    this.loaderService.showLoader();
    this.userName = await this.storageService.getItem('userName')
    this.shopApiService.get10Shops().subscribe(
      (shops: any) => {
        this.shops = shops.data
        console.log(shops);
        this.loaderService.hideLoader();
      },
      (error: any) => {
        console.error(error);
        this.loaderService.hideLoader();
      }
    );
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getShops()
      event.target.complete();
    }, 2000);
  }
}
