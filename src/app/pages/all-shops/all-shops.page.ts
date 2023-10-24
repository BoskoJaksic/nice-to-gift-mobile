import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {ShopModel} from "../../shared/model/shop.model";
import {ShopApiServices} from "../../shared/services/shop-api.services";

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.page.html',
  styleUrls: ['./all-shops.page.scss'],
})
export class AllShopsPage implements OnInit {
  allShops: ShopModel[] = []
  page: number = 1


  constructor(public commonService: CommonService, private shopApiService: ShopApiServices) {
  }

  ngOnInit() {
    this.getAllShops(1)
  }

  goBackToPrevPage(): void {
    this.commonService.goToRoute('/tabs/tabs/gift-tab');
  }

  getAllShops(page: number): void {
    this.shopApiService.getAllShops(`Shop?Page=${page}&Size=10`).subscribe(
      (shops: any) => {
        // Append new shops to the existing allShops array
        this.allShops = [...this.allShops, ...shops.data];
        // Handle the shops data returned from the service
        console.log(shops);
      },
      (error: any) => {
        // Handle errors if any
        console.error(error);
      }
    );
  }

  onIonInfinite(event: any) {
    this.page++; // Increase the page number
    this.getAllShops(this.page);// Call your existing getAllShops method with the updated page number
    event.target.complete();
  }
}
