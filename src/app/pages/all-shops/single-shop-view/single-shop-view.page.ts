import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AmountService} from "../../../shared/services/ammount.service";
import {CommonService} from "../../../services/common.service";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ShopModel} from "../../../shared/model/shop.model";
import {CheckoutService} from "../../../shared/services/checkout.service";
import {StorageService} from "../../../shared/services/storage.service";

@Component({
  selector: 'app-single-shop-view',
  templateUrl: './single-shop-view.page.html',
  styleUrls: ['./single-shop-view.page.scss'],
})
export class SingleShopViewPage implements OnInit {
  shopId: string = ''
  totalAmountFromChild: number = 0;
  shopDetails:any
  constructor(private _Activatedroute: ActivatedRoute,
              public amountService: AmountService,
              public checkoutService: CheckoutService,
              public storageService: StorageService,
              private shopApiService: ShopApiServices,
              private commonService: CommonService) {
  }


  ngOnInit() {
    this.shopId = this._Activatedroute.snapshot.params["id"];
    this.amountService.setShopId(this.shopId);
    this.storageService.setItem('shopId',this.shopId)
    this.getShopDetails();
  }

  getShopDetails() {
    this.shopApiService.getSingleShopDetails(this.shopId).subscribe(
      (shops: ShopModel) => {
        this.shopDetails = shops
        // Handle the shops data returned from the service
        console.log('shopDetails',this.shopDetails);
      },
      (error: any) => {
        // Handle errors if any
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
