import {Component, OnInit} from '@angular/core';
import {AmountService} from "../../../shared/services/ammount.service";
import {CommonService} from "../../../services/common.service";
import {CheckoutService} from "../../../shared/services/checkout.service";
import {ProductModel} from "../../../shared/model/product.model";
import {StorageService} from "../../../shared/services/storage.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  selectedProducts: any[] = [];

  constructor(public commonService: CommonService,
              private checkoutService: CheckoutService,
              private storageService: StorageService,
              public amountService: AmountService) {
  }

  ngOnInit() {
    console.log('ch products', this.selectedProducts)
    this.checkoutService.getAllProducts().subscribe(r=>{
      this.selectedProducts = r.filter(p => p.quantity > 0);
    })

    this.amountService.calculateTotalAmount(this.selectedProducts)
  }

  updateProductQuantity(product: ProductModel,increase:boolean) {
    if (!increase){
      this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id)
    }
    this.checkoutService.updateProductQuantity(product,increase);
    this.amountService.calculateTotalAmount(this.selectedProducts)
  }

  async goBackToPrevPage(): Promise<void> {
    let shopId = await this.storageService.getItem('shopId')
    this.commonService.goToRoute('all-shops/single-shop-view', shopId);
  }
}
