import {Injectable} from '@angular/core';
import {ProductModel} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AmountService {
  private totalAmount: number = 0;
  private singleShopId: String = '';
  feeAmount: string = '';
  feeAmountCalculated: number = 0;
  totalToPay: number = 0


  setFeeAmount(amount: string): void {
    this.feeAmount = amount;
  }

  getFeeAmount() {
    return this.feeAmount
  }

  getFeeAmountCalc() {
    return this.calculateFeeAmount()
  }

  setTotalAmount(amount: number): void {
    this.totalAmount = amount;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }


  calculateFeeAmount() {
    return this.feeAmountCalculated = Math.ceil(this.totalAmount * (parseFloat(this.feeAmount) / 100) * 100) / 100;
  }

  setTotalAmountToPay(amount: number): void {
    this.totalToPay = amount;
  }

  getTotalAmountToPay() {
    return this.totalToPay;
  }

  getTotalToPay() {
    this.setTotalAmountToPay(this.getTotalAmount() + this.calculateFeeAmount())
  }


  calculateTotalAmount(products: ProductModel[]): void {
    const totalAmount = products.reduce((total, product) => {
      return total + product.total;
    }, 0);

    this.setTotalAmount(totalAmount);
    this.getTotalToPay()
  }
}
