import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {AmountService} from "../../../shared/services/ammount.service";
import {ActivatedRoute} from '@angular/router';
import {StripeService} from "../../../shared/services/stripe.service";
import {CardModel} from "../../../shared/model/payment/card.model";
import {StorageService} from "../../../shared/services/storage.service";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  selectedCard: any = null;
  cards: CardModel[] = [];
  receivedMessage: string = ''
  constructor(public commonService: CommonService,
              public amountService: AmountService,
              private stripeService: StripeService,
              private loaderService: LoaderService,
              private storageService: StorageService,
              private route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.route.url.subscribe(segments => {
      console.log('Navigirali ste na stranicu "details".');
      this.getUsersCards();
    });
  }

  async getUsersCards() {
    this.loaderService.showLoader();
    let userEmail = await this.storageService.getItem('userEmail')
    this.stripeService.getCustomerCards(userEmail).subscribe({
      next: (r) => {
        this.cards = r;
        this.loaderService.hideLoader();

      }, error: (err) => {
        this.loaderService.hideLoader();

      }
    })
  }
  onSelectCard(card: any) {
    if (this.selectedCard === card) {
      this.selectedCard = null;
    } else {
      this.selectedCard = card;
      console.log(this.selectedCard);
    }
  }
  goBackToPrevPage() {
    this.commonService.goToRoute('all-shops/checkout');
  }

  receiveMessage(message: string) {
    this.receivedMessage = message;
  }
}
