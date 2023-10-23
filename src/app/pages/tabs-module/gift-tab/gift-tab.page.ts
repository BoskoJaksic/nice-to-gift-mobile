import {Component, OnInit} from '@angular/core';
import {ShopModel} from "../../../shared/model/shop.model";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ActivatedRoute} from "@angular/router";

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
              private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const state = window.history.state;
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

  handleCloseComponent(event: any) {
    this.isFromCheckout = event;
  }
}
