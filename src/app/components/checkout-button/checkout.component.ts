import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../shared/services/storage.service";
import {StripeService} from "../../shared/services/stripe.service";
import {PaymentSheetEventsEnum, Stripe} from "@capacitor-community/stripe";
import {Subscription} from "rxjs";
import {OrdersApiService} from "../../shared/services/orders-api.service";
import {CheckoutService} from "../../shared/services/checkout.service";
import {ProductModel, SelectedProducts} from "../../shared/model/product.model";
import {ReceiverMessageService} from "../../shared/services/receiver-message.service";
import {KeyboardService} from "../../shared/services/keyboard.service";
import {OrderIdService} from "../../shared/services/order-id.service";
import {ApiService} from "../../core/api.service";
import {ToasterService} from "../../shared/services/toaster.service";
import {LoaderService} from "../../shared/services/loader.service";

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
  @Input() cardObj: any;
  @Output() messageEvent = new EventEmitter<string>();
  receiverMessage = ''
  data: any = {};
  orderProducts: ProductModel [] = []
  orderId: string = ''
  items: SelectedProducts[] = []
  keyboardSubscription: Subscription;
  buttonVisible = true;
  goodToGo = false;

  constructor(public commonService: CommonService,
              private router: Router,
              private orderIdService: OrderIdService,
              private apiService: ApiService,
              private ordersApiService: OrdersApiService,
              private checkoutService: CheckoutService,
              private stripeService: StripeService,
              private toasterService: ToasterService,
              private receiverMessageService: ReceiverMessageService,
              private storageService: StorageService,
              private keyboardService: KeyboardService,
              private loaderService: LoaderService,
              private http: HttpClient) {
    this.keyboardSubscription = this.keyboardService.keyboardVisible$.subscribe(
      keyboardVisible => {
        this.buttonVisible = !keyboardVisible;
      }
    );
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
    this.loaderService.showLoader();
    let dataToSend = {
      orderRequest: {
        senderId: await this.storageService.getItem('userId'),
        shopId: this.orderProducts[0].shopId,
        items: this.items,
        receiverComment: this.receiverMessage,
        shopComment: '',
      },
      paymentRequest: {
        email: this.data.email,
        amount: this.amount,
        currency: "EUR",
        paymentMethodId: null
      }
    }
    if (this.cardObj) {
      dataToSend.paymentRequest.paymentMethodId = this.cardObj.id
    } else {
      dataToSend.paymentRequest.paymentMethodId = null
    }
    this.ordersApiService.makeOrder(dataToSend).subscribe({
      next: (r) => {
        this.orderId = r.orderId
        if (this.cardObj) {
          this.pay = false
          this.goToRoute();
          this.receiverMessageService.setReceiverMessage('')
        } else {
          let keys = {
            paymentIntentClientSecret: r.paymentResponse.paymentIntent,
            customerId: r.paymentResponse.customer,
            customerEphemeralKeySecret: r.paymentResponse.ephemeralKey,
          }
          this.doManualPayment(keys, r.orderId)
        }

        // paymentResponse.paymentStatus = 'succeed'
        // this.updateOrder(r.orderId, true) todo check if thi is needed here, probably not

      }, error: (err) => {
        this.loaderService.hideLoader();
        this.toasterService.presentToast('Something went wrong', 'danger')
        this.messageEvent.emit(err.error.detail);
      }
    })
  }


  updateOrder(orderId: any, isPaymentSuccessful: boolean) {
    let dataToSend = {
      orderId: orderId,
      isPaymentSuccessful: isPaymentSuccessful
    }

    this.ordersApiService.updateOrder(dataToSend).subscribe({
      next: (r) => {
        console.log('update succeed')
        this.pay = !isPaymentSuccessful;
      }, error: (err) => {
        this.pay = true;
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

  async doManualPayment(keys: any, orderId: any) {
    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: keys.paymentIntentClientSecret,
        customerId: keys.customerId,
        customerEphemeralKeySecret: keys.customerEphemeralKeySecret,
        merchantDisplayName: 'NiceToGift',
      });
      const result = await Stripe.presentPaymentSheet();
      console.log('result', result)
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        this.receiverMessageService.setReceiverMessage('')
        this.updateOrder(orderId, true);
        this.pay = false;
        this.goToRoute()
      } else {
        this.updateOrder(orderId, false);
        this.loaderService.hideLoader();
      }
    } catch (e) {
      console.log('err', e)
      this.loaderService.hideLoader();
      this.updateOrder(orderId, false);
    }
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
        this.orderIdService.setID(this.orderId)
        this.router.navigate(['tabs/tabs/gift-tab'], navigationExtras);
      } else {

        if ((this.goTo === 'all-shops/checkout' && this.amount === 0) || (this.goTo === 'all-shops/payment-method' && this.amount === 0)) {
          this.toasterService.presentToast('Add at least one product to cart', 'warning')
        } else {
          this.commonService.goToRoute(this.goTo);
        }
      }
      this.loaderService.hideLoader();

    }
  }

  ngOnDestroy() {
    this.keyboardSubscription.unsubscribe();
  }
}
