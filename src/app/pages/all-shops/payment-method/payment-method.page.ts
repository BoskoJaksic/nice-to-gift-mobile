import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {AmountService} from "../../../shared/services/ammount.service";

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {


  constructor(private commonService: CommonService,
              public amountService: AmountService
  ) {
  }

  ngOnInit() {

  }


  goBackToPrevPage() {
    this.commonService.goToRoute('all-shops/checkout');

  }
}
