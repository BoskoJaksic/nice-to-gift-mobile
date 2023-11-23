import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Share} from "@capacitor/share";
import {OrdersApiService} from "../../shared/services/orders-api.service";
import {LoaderService} from "../../shared/services/loader.service";
import {OrderIdService} from "../../shared/services/order-id.service";

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.scss'],
})
export class OrderConfirmedComponent implements OnInit {
  @Output() closeComponent: EventEmitter<any> = new EventEmitter();
  orderDetails: any
  isLoading: boolean = false;

  constructor(public commonService: CommonService,
              public ordersApiService: OrdersApiService,
              private orderIdService: OrderIdService) {
  }

  ngOnInit() {
  }


  async shareLInk() {
    this.isLoading = true;
    let orderId = this.orderIdService.getID()
    this.ordersApiService.getSingleOrder(orderId).subscribe({
      next: async (r) => {
        console.log('single order details from checkout', r)
        this.orderDetails = r
        await Share.share({
          text: this.orderDetails.receiverComment,
          url: `https://orange-grass-0aed0ab03.4.azurestaticapps.net/tabs/tabs/profile-tab/${orderId}`,
          dialogTitle: 'Nice To Gift',
        });
        this.isLoading = false;
      }, error: (err) => {
        this.isLoading = false;
      }
    })
  }

  closeTab() {
    this.closeComponent.emit(false);
  }

}
