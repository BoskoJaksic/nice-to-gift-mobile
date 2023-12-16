import {Component, OnInit} from '@angular/core';
import {ShopModel} from "../../../shared/model/shops/shop.model";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ActivatedRoute} from "@angular/router";
import {AmountService} from "../../../shared/services/ammount.service";
import {CheckoutService} from "../../../shared/services/checkout.service";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-gift-tab',
  templateUrl: './gift-tab.page.html',
  styleUrls: ['./gift-tab.page.scss'],
})
export class GiftTabPage implements OnInit {
  shops: ShopModel[] = [];
  topRatedShops: ShopModel[] = [];
  isFromCheckout: boolean = false;

  constructor(private shopApiService: ShopApiServices,
              private route: ActivatedRoute,
              private amountService: AmountService,
              private loaderService: LoaderService,
              private shopApiServices: ShopApiServices,
              private checkoutService: CheckoutService
  ) {
    this.route.paramMap.subscribe(params => {
      this.getShops();
      this.getFeeAmount();
      const state = window.history.state;
      this.amountService.setTotalAmount(0);
      this.checkoutService.setAllProducts([])
      if (state && state.isFromCheckout !== undefined) {
        this.isFromCheckout = state.isFromCheckout
      } else {
        this.isFromCheckout = false;
      }
    });
  }


  ngOnInit() {
  }
  getFeeAmount() {
    this.shopApiServices.getFeeAmount().subscribe(r => {
      let fee = r.feePercentRate.toString()
      this.amountService.setFeeAmount(fee)
    })
  }
  getShops(): void {
    this.loaderService.showLoader()
    this.shopApiService.get10Shops().subscribe(
      (shops: any) => {
        this.shops = shops.data
        this.getTopRatedShops();
      },
      (error: any) => {
        // Handle errors if any
        this.loaderService.hideLoader()

        console.error(error);
      }
    );
  }

  getTopRatedShops(): void {
    this.shopApiService.getTopRatedShops().subscribe(
      (shops: any) => {
        this.topRatedShops = shops.data
        this.loaderService.hideLoader()

        console.log(shops);
      },
      (error: any) => {
        this.loaderService.hideLoader()
        console.error(error);
      }
    );
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getShops();
      this.getTopRatedShops();
      event.target.complete();
    }, 2000);
  }

  handleCloseComponent(event: any) {
    this.isFromCheckout = event;
  }
}
