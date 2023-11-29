import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AmountService} from "../../../shared/services/ammount.service";
import {CommonService} from "../../../services/common.service";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ShopModel} from "../../../shared/model/shops/shop.model";
import {CheckoutService} from "../../../shared/services/checkout.service";
import {StorageService} from "../../../shared/services/storage.service";
import {ShopService} from "../../../shared/services/shop.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {GeocodingService} from "../../../shared/services/geo.service";
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-single-shop-view',
  templateUrl: './single-shop-view.page.html',
  styleUrls: ['./single-shop-view.page.scss'],
})
export class SingleShopViewPage implements OnInit {
  shopId: string = ''
  totalAmountFromChild: number = 0;
  shopDetails: any

  constructor(private _Activatedroute: ActivatedRoute,
              public amountService: AmountService,
              public checkoutService: CheckoutService,
              public storageService: StorageService,
              public shopService: ShopService,
              private loaderService: LoaderService,
              private geocodingService: GeocodingService,
              private shopApiService: ShopApiServices,
              private commonService: CommonService) {
  }


  ngOnInit() {
    this._Activatedroute.params.subscribe(async params => {
      const shopId = params['id'];
      if (shopId !== 'false') {
        this.shopId = shopId
        this.shopService.setShopId(shopId)
      }
      this.getShopDetails();
      await this.getAddress();

    })
  }

  async getAddress() {
    let address = 'Bulevar Revolucije 22, 81000 Podgorica, Crna Gora'
    let address2 = 'Vukasina Markovica 224, 81000 Podgorica, Crna Gora'

    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);

    this.geocodingService.getCoordinatesFromAddress(address).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          this.geocodingService.getCoordinatesFromAddress(address2).subscribe(
            (data: any[]) => {
              if (data && data.length > 0) {
                const latitude2 = data[0].lat;
                const longitude2 = data[0].lon;
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
                const distance = this.geocodingService.calculateDistance(latitude, longitude, latitude2, longitude2);
                console.log('Udaljenost između tačaka je:', distance.toFixed(2), 'kilometara');

                // Handle coordinates here
              } else {
                console.error('No coordinates found for the address.');
              }
            },
            error => {
              console.error('Error fetching coordinates:', error);
            }
          );


          // Handle coordinates here
        } else {
          console.error('No coordinates found for the address.');
        }
      },
      error => {
        console.error('Error fetching coordinates:', error);
      }
    );
  }


  getShopDetails() {
    this.loaderService.showLoader()
    let shopId = this.shopService.getShopId();
    this.shopApiService.getSingleShopDetails(shopId).subscribe(
      (shopsDetails: ShopModel) => {
        this.shopDetails = shopsDetails
        this.loaderService.hideLoader()
        console.log('shopDetails', this.shopDetails);
      },
      (error: any) => {
        this.loaderService.hideLoader()
        console.error(error);
      }
    );
  }

  handleTotalAmount(totalAmount: number) {
    this.totalAmountFromChild = totalAmount;
  }

  goBackToPrevPage(): void {
    this.amountService.setTotalAmount(0);
    this.checkoutService.setAllProducts([])
    this.commonService.goToRoute('all-shops');
  }
}
