import {Component, OnInit} from '@angular/core';
import {ShopModel} from "../../../shared/model/shops/shop.model";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ActivatedRoute} from "@angular/router";
import {AmountService} from "../../../shared/services/ammount.service";
import {CheckoutService} from "../../../shared/services/checkout.service";

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
              private checkoutService: CheckoutService
  ) {
    this.route.paramMap.subscribe(params => {
      const state = window.history.state;
      this.amountService.setTotalAmount(0);
      this.checkoutService.setAllProducts([])
      if (state && state.isFromCheckout !== undefined) {
        const isFromCheckout = state.isFromCheckout;
        console.log('isFromCheckout:', isFromCheckout);
        this.isFromCheckout = isFromCheckout
      } else {
        this.isFromCheckout = false;
      }
    });
  }

  ngOnInit() {
    this.getShops();
    this.getTopRatedShops();
  }

  getShops(): void {
    this.shopApiService.get10Shops().subscribe(
      (shops: any) => {
        this.shops = shops.data
        // Handle the shops data returned from the service
        console.log(shops);
      },
      (error: any) => {
        // Handle errors if any
        console.error(error);
      }
    );
  }

  getTopRatedShops(): void {
    this.shopApiService.getTopRatedShops().subscribe(
      (shops: any) => {
        this.topRatedShops = shops.data
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
