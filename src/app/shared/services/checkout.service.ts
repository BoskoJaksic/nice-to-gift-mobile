import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ToasterService} from "./toaster.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private allProductsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private toasterService:ToasterService) {
  }

  setAllProducts(products: any[]): void {
    this.allProductsSubject.next(products);
  }

  getAllProducts(): Observable<any[]> {
    return this.allProductsSubject.asObservable();
  }

  updateProductQuantity(product: any, increase: boolean): void {
    const updatedProducts = this.allProductsSubject.value.map(p => {
      if (p.id === product.id) {
        let updatedQuantity = p.quantity;
        if (increase) {
          if (product.stock === product.quantity) {
            this.toasterService.presentToast('No more in the stock', 'warning')
          } else {
            updatedQuantity += 1; // Increase quantity by 1
          }

        } else {
          updatedQuantity = updatedQuantity > 0 ? updatedQuantity - 1 : 0; // Decrease quantity by 1, but not below 0
        }
        const updatedTotal = updatedQuantity * p.amount;
        return {...p, quantity: updatedQuantity, total: updatedTotal};
      }
      return p;
    });

    this.setAllProducts(updatedProducts);
  }
}
