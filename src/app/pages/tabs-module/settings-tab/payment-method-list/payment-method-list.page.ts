import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../../services/common.service";
import {ActivatedRoute} from "@angular/router";
import {StripeService} from "../../../../shared/services/stripe.service";
import {StorageService} from "../../../../shared/services/storage.service";
import {CardModel} from "../../../../shared/model/payment/card.model";

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.page.html',
  styleUrls: ['./payment-method-list.page.scss'],
})
export class PaymentMethodListPage implements OnInit {
  goToCheckout: string = '';
  cards: CardModel[] = [];

  constructor(public commonService: CommonService,
              private stripeService: StripeService,
              private storageService: StorageService,
              private _Activatedroute: ActivatedRoute,) {

  }

  ngOnInit() {
    this._Activatedroute.params.subscribe(async params => {
      const paramId = params['id'];
      if (paramId === 'true') {
        this.goToCheckout = 'true';
      } else {
        this.goToCheckout = 'false';
      }
      await this.getUsersCards();
    })
  }


  async getUsersCards() {
    let userEmail = await this.storageService.getItem('userEmail')
    this.stripeService.getCustomerCards(userEmail).subscribe({
      next: (r) => {
        this.cards = r;
      }, error: (err) => {

      }
    })
  }

  goTo() {
    if (this.goToCheckout === 'true') {
      this.commonService.goToRoute('all-shops/payment-method')
    } else {
      this.commonService.goToRoute('tabs/tabs/settings-tab')
    }
  }
}
