import {Component, Input, OnInit} from '@angular/core';
import {AmountService} from "../../shared/services/ammount.service";
import {ProductModel} from "../../shared/model/product.model";
import {ProductApiService} from "../../shared/services/product-api.service";
import {ToasterService} from "../../shared/services/toaster.service";
import {CheckoutService} from "../../shared/services/checkout.service";
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../shared/services/shop.service";
import {UserApiServices} from "../../shared/services/user.api.services";
import {AlertController} from "@ionic/angular";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
})
export class ShopProductsComponent implements OnInit {
  allProducts: ProductModel[] = []
  @Input() shopId: string = ''
  page: number = 1


  constructor(private amountService: AmountService,
              private toasterService: ToasterService,
              private userApiServices: UserApiServices,
              private shopService: ShopService,
              public checkoutService: CheckoutService,
              public commonService: CommonService,
              private route: ActivatedRoute,
              private alertController: AlertController,
              private productApiService: ProductApiService) {

  }

  ngOnInit() {
    this.checkoutService.getAllProducts().subscribe(r => {
      this.allProducts = r
    })
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'false') {
        this.page = 1;
        this.getAllProducts(this.page);
      }
      this.shopId = this.shopService.getShopId();
    });
  }


  getAllProducts(page: number) {
    this.productApiService.getAllShopProducts(`Products?ShopId=${this.shopId}&Page=${page}&Size=5`).subscribe(
      (products: any) => {
        const newProducts = products.data.map((product: any) => {
          const fee = parseFloat(this.amountService.getFeeAmount());
          const newAmount = product.amount * (1 + fee / 100);
          return {...product, quantity: 0, total: 0, amount: newAmount.toFixed(2)};
        });

        const uniqueNewProducts = newProducts.filter((newProduct: ProductModel) => {
          return !this.allProducts.some((existingProduct) => existingProduct.id === newProduct.id);
        });

        this.allProducts = this.allProducts.concat(uniqueNewProducts);
        this.checkoutService.setAllProducts(this.allProducts);
        this.checkoutService.getAllProducts().subscribe(r => {
          this.allProducts = r;
        });

        console.log('products', this.allProducts);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  // getAllProducts(page: number) {
  //   this.productApiService.getAllShopProducts(`Product?ShopId=${this.shopId}&Page=${page}&Size=5`).subscribe(
  //     (products: any) => {
  //       const newProducts = products.data.map((product: any) => ({...product, quantity: 0, total: 0}));
  //       this.allProducts = this.allProducts.concat(newProducts);
  //
  //       // Postavite sve proizvode u servis za naplatu
  //       this.checkoutService.setAllProducts(this.allProducts);
  //
  //       // Dobavite sve proizvode iz servisa za naplatu
  //       this.checkoutService.getAllProducts().subscribe(r => {
  //         this.allProducts = r;
  //       });
  //       // this.allProducts = products.data.map((product: any) => ({...product, quantity: 0, total: 0}));
  //       // this.checkoutService.setAllProducts(this.allProducts);
  //       // this.checkoutService.getAllProducts().subscribe(r => {
  //       //   this.allProducts = r
  //       // })
  //       // Handle the shops data returned from the service
  //       console.log('product', this.allProducts);
  //     },
  //     (error: any) => {
  //       // Handle errors if any
  //       console.error(error);
  //     }
  //   );
  // }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Warning',
      subHeader: 'You can not place order',
      message: 'You are not logged in',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Log in',
          handler: () => {
            this.commonService.goToRoute('');
          }
        },
      ]
    });

    await alert.present();
  }

  increaseQuantity(product: any) {
    if (!this.userApiServices.isUserLoggedIn()) {
      this.presentAlert();
    } else {
      if (product.stock === product.quantity) {
        this.toasterService.presentToast('No more in the stock', 'warning')
      } else {
        product.quantity++; // Increase product quantity by 1
      }
    }
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity--; // Decrease product quantity by 1, but not below 1
    }
  }

  updateTotal(product: any) {
    product.total = product.quantity * product.amount;
    this.amountService.calculateTotalAmount(this.allProducts)
    this.updateCheckoutService();
  }

  updateCheckoutService(): void {
    this.checkoutService.setAllProducts(this.allProducts);
  }

  onIonInfinite(event: any) {
    this.page++; // Increase the page number
    this.getAllProducts(this.page);// Call your existing getAllShops method with the updated page number
    event.target.complete();
  }
}
