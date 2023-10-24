// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class CheckoutService {
//
//   private allProducts: any[] = []; // Original list of products fetched from the API
//
//   constructor() {}
//
//   setAllProducts(products: any[]): void {
//     this.allProducts = products;
//   }
//
//   getAllProducts(): any[] {
//     return this.allProducts;
//   }
//
//   removeProduct(product: any): void {
//     const updatedProducts = this.allProducts.map(p => {
//       if (p.id === product.id) {
//         const updatedQuantity = p.quantity > 0 ? p.quantity - 1 : 0; // Decrease quantity by 1, but not below 0
//         const updatedTotal = updatedQuantity * p.amount; // Recalculate total based on updated quantity
//         return { ...p, quantity: updatedQuantity, total: updatedTotal };
//       }
//       return p;
//     });
//
//     this.setAllProducts(updatedProducts);
//   }
// }
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

  // removeProduct(product: any): void {
  //   const updatedProducts = this.allProductsSubject.value.map(p => {
  //     if (p.id === product.id) {
  //       const updatedQuantity = p.quantity > 0 ? p.quantity - 1 : 0;
  //       const updatedTotal = updatedQuantity * p.amount;
  //       return { ...p, quantity: updatedQuantity, total: updatedTotal };
  //     }
  //     return p;
  //   });
  //
  //   this.setAllProducts(updatedProducts);
  // }

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
