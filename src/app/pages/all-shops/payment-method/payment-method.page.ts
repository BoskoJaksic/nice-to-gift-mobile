import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {AmountService} from "../../../shared/services/ammount.service";
import {ActivatedRoute} from '@angular/router';
import {StripeService} from "../../../shared/services/stripe.service";
import {CardModel} from "../../../shared/model/payment/card.model";
import {StorageService} from "../../../shared/services/storage.service";

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  selectedCard: any = null;
  cards: CardModel[] = [];
  constructor(public commonService: CommonService,
              public amountService: AmountService,
              private stripeService: StripeService,
              private storageService: StorageService,
              private route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.route.url.subscribe(segments => {
      console.log('Navigirali ste na stranicu "details".');
      //todo metoda za ucitati ostale kartice
      this.getUsersCards();
    });
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
  onSelectCard(card: any) {
    this.selectedCard = card;
    console.log(this.selectedCard); // Prikazuje kliknutu karticu u konzoli
  }

  goBackToPrevPage() {
    this.commonService.goToRoute('all-shops/checkout');
  }
}
