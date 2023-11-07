import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PaymentModel} from "../../shared/model/payment/payment.model";
import {StorageService} from "../../shared/services/storage.service";
import {ApiService} from "../../core/api.service";
import {StripeService} from "../../shared/services/stripe.service";

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() amount: any
  @Input() cardCheckout: boolean = false;
  @Input() goTo: string = '';
  @Input() isFromCheckout: boolean = false;
  @Input() pay: boolean = false;
  @Input() loader: boolean = false;
  @Input() cardObj: any;
  data: PaymentModel = {
    name: "",
    email: "",
    amount: 0,
    currency: 'EUR',
    paymentMethodId:""
  };

  constructor(public commonService: CommonService,
              private router: Router,
              private apiService: ApiService,
              private stripeService: StripeService,
              private storageService: StorageService,
              private http: HttpClient) {
  }

  async ngOnInit() {
    this.data.name = await this.storageService.getItem('userName')
    this.data.email = await this.storageService.getItem('userEmail')
    this.data.amount = 10
  }

  async doPayment() {
    let url = this.apiService.getApiUrl() + 'Orders/initiate-payment'
    // let url = environment.baseURL + 'orders' todo use this instead of the line above
    try {
      this.data.paymentMethodId = this.cardObj.id
      this.stripeService.initiatePayment(this.data).subscribe({
        next: (r) => {
          console.log('placanje',r)
        }, error: (err) => {
          console.log(err)
        }
      })
      // this.loader = true
      // Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      //   console.log('PaymentSheetEventsEnum.Completed');
      // });
      // // const data = new HttpParams({
      // //   fromObject: this.data
      // // })
      // const data$ = this.http.post<{
      //   paymentIntent: string;
      //   ephemeralKey: string;
      //   customer: string;
      // }>(url, this.data).pipe(first())
      // const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$)
      // this.loader = false
      // await Stripe.createPaymentSheet({
      //   paymentIntentClientSecret: paymentIntent,
      //   customerId: customer,
      //   customerEphemeralKeySecret: ephemeralKey,
      //   merchantDisplayName: 'NiceToGift',
      // });
      //
      // const result = await Stripe.presentPaymentSheet()
      // console.log('result', result)
      // if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
      //   this.pay = false
      //   this.goToRoute()
      // }
    } catch (e) {
      console.log('err', e)
      this.loader = false
    }
  }

  goToRoute() {
    if (this.pay) {
      this.doPayment();
    } else {

      const navigationExtras = {
        state: {
          isFromCheckout: true // Dodajte custom podatak u state objekt
        }
      };
      if (this.isFromCheckout) {
        this.router.navigate(['tabs/tabs/gift-tab'], navigationExtras);
      } else {
        this.commonService.goToRoute(this.goTo);
      }
    }
  }
}
