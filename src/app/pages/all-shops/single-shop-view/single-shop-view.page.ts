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
import {Subscription} from "rxjs";


@Component({
  selector: 'app-single-shop-view',
  templateUrl: './single-shop-view.page.html',
  styleUrls: ['./single-shop-view.page.scss'],
})
export class SingleShopViewPage implements OnInit {
  shopId: string = ''
  totalAmountFromChild: number = 0;
  shopDetails: any
  private routeSubscription!: Subscription;

  constructor(private _Activatedroute: ActivatedRoute,
              public amountService: AmountService,
              public checkoutService: CheckoutService,
              public storageService: StorageService,
              public shopService: ShopService,
              private loaderService: LoaderService,
              private shopApiService: ShopApiServices,
              private commonService: CommonService) {
  }


  ngOnInit() {
    this.routeSubscription = this._Activatedroute.params.subscribe(async params => {
      const shopId = params['id'];
      if (shopId !== 'false') {
        this.shopId = shopId
        this.shopService.setShopId(shopId)
      }
      this.getShopDetails();
    })
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

  goBackToPrevPage(): void {
    this.amountService.setTotalAmount(0);
    this.checkoutService.setAllProducts([])
    this.commonService.goToRoute('all-shops');
  }
  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
