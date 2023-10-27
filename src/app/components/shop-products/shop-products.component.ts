import {Component, Input, OnInit} from '@angular/core';
import {AmountService} from "../../shared/services/ammount.service";
import {ProductModel} from "../../shared/model/product.model";
import {ProductApiService} from "../../shared/services/product-api.service";
import {ToasterService} from "../../shared/services/toaster.service";
import {CheckoutService} from "../../shared/services/checkout.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
})
export class ShopProductsComponent implements OnInit {
  allProducts: ProductModel[] = []
  @Input() shopId: string = ''


  constructor(private amountService: AmountService,
              private toasterService: ToasterService,
              public checkoutService: CheckoutService,
              private route: ActivatedRoute,
              private productApiService: ProductApiService) {

  }

  ngOnInit() {
    this.checkoutService.getAllProducts().subscribe(r => {
      this.allProducts = r
    })
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'false') {

        this.getAllProducts();
      }
    });
  }


  getAllProducts() {
    this.productApiService.getAllShopProducts(`Product?ShopId=${this.shopId}`).subscribe(
      (products: any) => {

        this.allProducts = products.data.map((product: any) => ({...product, quantity: 0, total: 0}));
        this.checkoutService.setAllProducts(this.allProducts);
        this.checkoutService.getAllProducts().subscribe(r => {
          this.allProducts = r
        })
        // Handle the shops data returned from the service
        console.log('product', this.allProducts);
      },
      (error: any) => {
        // Handle errors if any
        console.error(error);
      }
    );
  }


  increaseQuantity(product: any) {
    console.log('inc', product)
    if (product.stock === product.quantity) {
      this.toasterService.presentToast('No more in the stock', 'warning')
    } else {
      product.quantity++; // Increase product quantity by 1
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
}
