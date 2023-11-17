import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../shared/services/storage.service";
import {ApiService} from "../../core/api.service";
import {StripeService} from "../../shared/services/stripe.service";
import {PaymentSheetEventsEnum, Stripe} from "@capacitor-community/stripe";
import {first, lastValueFrom} from "rxjs";
import {OrdersApiService} from "../../shared/services/orders-api.service";
import {CheckoutService} from "../../shared/services/checkout.service";
import {ProductModel, SelectedProducts} from "../../shared/model/product.model";
import {ReceiverMessageService} from "../../shared/services/receiver-message.service";
import {environment} from "../../../environments/environment";

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
  @Output() messageEvent = new EventEmitter<string>();
  receiverMessage = ''
  data: any = {};
  orderProducts: ProductModel [] = []
  orderId: string = ''
  items: SelectedProducts[] = []

  constructor(public commonService: CommonService,
              private router: Router,
              private apiService: ApiService,
              private ordersApiService: OrdersApiService,
              private checkoutService: CheckoutService,
              private stripeService: StripeService,
              private receiverMessageService: ReceiverMessageService,
              private storageService: StorageService,
              private http: HttpClient) {
  }

  async ngOnInit() {
    this.receiverMessageService.getReceiverMessage().subscribe(message => {
      this.receiverMessage = message;
    });
    this.data.name = await this.storageService.getItem('userName')
    this.data.email = await this.storageService.getItem('userEmail')
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pay']) {
      this.pay = true;
    }
  }

  async makeOrder() {
    let dataToSend = {
      senderId: await this.storageService.getItem('userId'),
      shopId: this.orderProducts[0].shopId,
      items: this.items,
      receiverComment: this.receiverMessage,
      shopComment: ''
    }
    this.ordersApiService.makeOrder(dataToSend).subscribe({
      next: (r) => {
        this.orderId = r.id;
        this.data.amount = this.amount;
        this.data.currency = 'EUR'
        // let url = this.apiService.getApiUrl() + 'Orders/initiate-payment'
        let url = environment.baseURL + 'Orders/initiate-payment'
        if (this.cardObj) {
          this.doAutomaticPayment()
        } else {
          this.doManualPayment(url);
        }
      }, error: (err) => {

      }
    })
  }

  updateOrder() {
    let dataToSend = {
      id: this.orderId,
      orderStatusEnum: 1
    }
    this.ordersApiService.updateOrder(dataToSend).subscribe({
      next: (r) => {
        console.log('update succeed')
      }, error: (err) => {
      }
    })
  }

  doPayment() {
    this.checkoutService.getAllProducts().subscribe(r => {
      this.orderProducts = r.filter(p => p.quantity > 0);
    });
    console.log('op', this.orderProducts)
    this.orderProducts.forEach(x => {
      const existingItem = this.items.find(item => item.productId === x.id);
      if (existingItem) {
        existingItem.quantity = x.quantity;
      } else {
        this.items.push({
          productId: x.id,
          quantity: x.quantity
        });
      }
    })
    this.makeOrder();
  }

  async doManualPayment(url: any) {
    try {
      this.loader = true
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
      const data$ = this.http.post<{
        paymentIntent: string;
        ephemeralKey: string;
        customer: string;
      }>(url, this.data).pipe(first())
      // @ts-ignore
      const {paymentIntent, ephemeralKey, customer} = await lastValueFrom(data$)
      this.loader = false
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'NiceToGift',
      });

      const result = await Stripe.presentPaymentSheet()
      console.log('result', result)
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        this.receiverMessageService.setReceiverMessage('')
        this.updateOrder();
        this.pay = false
        this.goToRoute()
      }
    } catch (e) {
      console.log('err', e)
      this.loader = false
    }
  }

  doAutomaticPayment() {
    this.loader = true
    this.data.paymentMethodId = this.cardObj.id
    this.stripeService.initiatePayment(this.data).subscribe({
      next: (r) => {
        this.updateOrder();
        this.pay = false
        this.goToRoute();
        this.loader = false;
        this.receiverMessageService.setReceiverMessage('')
      }, error: (err) => {
        this.messageEvent.emit(err.error.detail);
        console.log(err)
        this.loader = false
      }
    })
  }

  goToRoute() {
    if (this.pay) {
      this.doPayment();
    } else {
      const navigationExtras = {
        state: {
          isFromCheckout: true
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
