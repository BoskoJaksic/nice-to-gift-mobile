import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../../services/common.service";

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.page.html',
  styleUrls: ['./payment-method-list.page.scss'],
})
export class PaymentMethodListPage implements OnInit {

  constructor(public commonService:CommonService) { }

  ngOnInit() {
  }

}
