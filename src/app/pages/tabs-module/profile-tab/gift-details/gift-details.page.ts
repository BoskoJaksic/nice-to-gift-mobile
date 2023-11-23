import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../../services/common.service";
import {Share} from "@capacitor/share";
import {OrdersApiService} from "../../../../shared/services/orders-api.service";
import {LoaderService} from "../../../../shared/services/loader.service";

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.page.html',
  styleUrls: ['./gift-details.page.scss'],
})
export class GiftDetailsPage implements OnInit {
  orderId = ''
  orderDetails: any

  constructor(private route: ActivatedRoute,
              public commonService: CommonService,
              public ordersApiService: OrdersApiService,
              private loaderService: LoaderService,
  ) {
  }

  async shareLInk() {
    await Share.share({
      text: this.orderDetails.receiverComment,
      url: `https://orange-grass-0aed0ab03.4.azurestaticapps.net/tabs/tabs/profile-tab/${this.orderId}`,
      dialogTitle: 'Nice To Gift',
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      // @ts-ignore
      this.orderId = params['orderId'];
      this.getGiftDetails()
      console.log('get metoda za gift details ide ovdje');
    })
  }

  getGiftDetails() {
    this.loaderService.showLoader();
    this.ordersApiService.getSingleOrder(this.orderId).subscribe({
      next: (r) => {
        console.log('single order details', r)
        this.orderDetails = r
        this.loaderService.hideLoader()
      }, error: (err) => {
        this.loaderService.hideLoader()
      }
    })
  }
}
