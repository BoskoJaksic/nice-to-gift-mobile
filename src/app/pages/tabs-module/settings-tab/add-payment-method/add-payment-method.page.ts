import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../../services/common.service";
import {environment} from "../../../../../environments/environment";
import {StripeService} from "../../../../shared/services/stripe.service";
import {StorageService} from "../../../../shared/services/storage.service";
import {ActivatedRoute} from "@angular/router";
import {ToasterService} from "../../../../shared/services/toaster.service";

declare var Stripe: any;


@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.page.html',
  styleUrls: ['./add-payment-method.page.scss'],
})
export class AddPaymentMethodPage implements OnInit {
  stripe: any;
  elements: any;
  cardNumberElement: any;
  goToCheckout: string = '';


  constructor(public commonService: CommonService,
              public stripeService: StripeService,
              private _Activatedroute: ActivatedRoute,
              private toasterService: ToasterService,
              private storageService: StorageService
  ) {
    this.stripe = Stripe(environment.stripe.publishKey);
    this.elements = this.stripe.elements();
  }


  async ngOnInit() {
    this._Activatedroute.params.subscribe(async params => {
      const paramId = params['id'];
      if (paramId === 'true') {
        this.goToCheckout = 'true';
      } else {
        this.goToCheckout = 'false';
      }
    })
    var style = {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontSize: '16px',

        '::placeholder': {
          color: '#6d6d6d',
        },
      },
    };
    this.cardNumberElement = this.elements.create('cardNumber', {
      style: style,
      placeholder: 'Card number',
    });
    this.cardNumberElement.mount('#card-number-element');

    var cardExpiryElement = this.elements.create('cardExpiry', {
      style: style,
      placeholder: 'Expiry date',
    });
    cardExpiryElement.mount('#card-expiry-element');

    var cardCvcElement = this.elements.create('cardCvc', {
      style: style,
      placeholder: 'Cvc',
    });
    cardCvcElement.mount('#card-cvc-element');

    this.cardNumberElement.on('change', (event: any) => {
      this.setOutcome(event);
    });

  }


  async setOutcome(result: any) {
    var errorElement = document.querySelector('.error');
    // @ts-ignore
    errorElement.classList.remove('visible');
    if (result.token) {
      await this.createCard(result.token.id)
    } else if (result.error) {
      // @ts-ignore
      errorElement.textContent = result.error.message;
      // @ts-ignore
      errorElement.classList.add('visible');
    }
  }

  async onSubmit() {
    // @ts-ignore
    var name = document.getElementById('name').value;
    if (!name) {
      var errorElement = document.querySelector('.error');
      // @ts-ignore
      errorElement.textContent = "You must enter a name.";
      // @ts-ignore
      errorElement.classList.add('visible');
      return;
    }
    var options = {
      name: name,
    };
    this.stripe.createToken(this.cardNumberElement, options).then((result: any) => {
      this.setOutcome(result);
    });
  }

  async createCard(cardId: any) {
    let userEmail = await this.storageService.getItem('userEmail')
    let dataToSend = {
      email: userEmail,
      cardToken: cardId
    }
    this.stripeService.createCard(dataToSend).subscribe( {
      next:()=>{
        this.toasterService.presentToast('Card successfully added','success')
        this.goTo();
      },error:(err)=>{
        this.toasterService.presentToast('Something went wrong','danger')
      }
    })
  }

  goTo() {
    if (this.goToCheckout === 'true') {
      this.commonService.goToRoute('all-shops/payment-method')
    } else {
      this.commonService.goToRoute('tabs/tabs/settings-tab/payment-method-list')
    }
  }
}

