import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {ShopModel} from "../../shared/model/shops/shop.model";
import {ShopApiServices} from "../../shared/services/shop-api.services";
import {AmountService} from "../../shared/services/ammount.service";
import {CheckoutService} from "../../shared/services/checkout.service";
import {LoaderService} from "../../shared/services/loader.service";

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.page.html',
  styleUrls: ['./all-shops.page.scss'],
})
export class AllShopsPage implements OnInit {
  allShops: ShopModel[] = []
  page: number = 1
  searchTerm = ''

  constructor(public commonService: CommonService, private shopApiService: ShopApiServices,
              private amountService: AmountService,
              private loaderService: LoaderService,
              private checkoutService: CheckoutService
  ) {
  }

  ngOnInit() {
    this.page = 1;
    this.getAllShops(this.page)
    this.amountService.setTotalAmount(0);
    this.checkoutService.setAllProducts([])
  }

  goBackToPrevPage(): void {
    this.commonService.goToRoute('/tabs/tabs/gift-tab');
  }

  getAllShops(page: number): void {
    this.loaderService.showLoader()
    this.shopApiService.getAllShops(`Shop?Page=${page}&Size=10`).subscribe(
      (shops: any) => {
        // Append new shops to the existing allShops array
        if (page === 1) {
          this.allShops = shops.data
        } else {
          this.allShops = [...this.allShops, ...shops.data];
        }
        this.loaderService.hideLoader()
        console.log(shops);
      },
      (error: any) => {
        this.loaderService.hideLoader()
        console.error(error);
      }
    );
  }

  searchShop() {
    this.page = 1;
    this.shopApiService.searchShop(`Shop?SearchTerm=${this.searchTerm}&Page=${this.page}&Size=10`).subscribe(
      (shops: any) => {
        // Append new shops to the existing allShops array
        if ( this.page === 1) {
          this.allShops = shops.data
        } else {
          this.allShops = [...this.allShops, ...shops.data];
        }
        // Handle the shops data returned from the service
        console.log(shops);
      },
      (error: any) => {
        // Handle errors if any
        console.error(error);
      }
    );
  }

  handleRefresh(event: any) {
    this.page = 1
    setTimeout(() => {
      this.getAllShops(this.page);
      event.target.complete();
    }, 2000);
  }


  onIonInfinite(event: any) {
    this.page++; // Increase the page number
    this.getAllShops(this.page);// Call your existing getAllShops method with the updated page number
    event.target.complete();
  }
}
