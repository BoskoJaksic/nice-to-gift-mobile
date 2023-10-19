import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {cards} from "../../shared/mocks";

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
})
export class ShopProductsComponent implements OnInit {
  @Output() totalAmountEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Input() products: any

  constructor() {
  }

  ngOnInit() {
  }
  increaseQuantity(product: any) {
    product.quantity++; // Increase product quantity by 1
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity--; // Decrease product quantity by 1, but not below 1
    }
  }

  updateTotal(product: any) {
    product.total = product.quantity * product.price;
    this.totalAmountEmitter.emit(this.getTotalAmount());
  }

  getTotalAmount(): number {
    return this.products.reduce((total:any, product:any) => total + product.total, 0);
  }
  protected readonly cards = cards;

  onIonInfinite($event: any) {

  }
}
