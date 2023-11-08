import {Component, Input, OnInit} from '@angular/core';
import {AmountService} from "../../shared/services/ammount.service";
import {ProductModel} from "../../shared/model/product.model";
import {ProductApiService} from "../../shared/services/product-api.service";
import {ToasterService} from "../../shared/services/toaster.service";
import {CheckoutService} from "../../shared/services/checkout.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../shared/services/storage.service";
import {ShopService} from "../../shared/services/shop.service";
import {LoaderService} from "../../shared/services/loader.service";

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
              private storageService: AmountService,
              private shopService: ShopService,
              private loaderService: LoaderService,
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
        this.page = 1;
        this.getAllProducts(this.page);
      }
      this.shopId = this.shopService.getShopId();
    });
  }


  getAllProducts(page: number) {
    this.loaderService.showLoader()
    this.productApiService.getAllShopProducts(`Product?ShopId=${this.shopId}&Page=${page}&Size=5`).subscribe(
      (products: any) => {
        // Mapirajte novopristigle proizvode
        // const newProducts = products.data.map((product: any) => ({...product, quantity: 0, total: 0}));
        const newProducts = products.data.map((product: any) => {
          const fee = parseFloat(this.amountService.getFeeAmount());
          // Izračunajte novu vrijednost amount s dodatkom 3%
          const newAmount = product.amount * (1 + fee / 100);
          // Dodajte quantity i total polja, te novu vrijednost amount u proizvod
          return {...product, quantity: 0, total: 0, amount: newAmount};
        });

        // Provjerite je li svaki novi proizvod već prisutan u this.allProducts
        const uniqueNewProducts = newProducts.filter((newProduct:ProductModel) => {
          return !this.allProducts.some((existingProduct) => existingProduct.id === newProduct.id);
        });

        // Dodajte samo jedinstvene proizvode na listu
        this.allProducts = this.allProducts.concat(uniqueNewProducts);

        // Postavite sve proizvode u servis za naplatu
        this.checkoutService.setAllProducts(this.allProducts);

        // Dobavite sve proizvode iz servisa za naplatu
        this.checkoutService.getAllProducts().subscribe(r => {
          this.allProducts = r;
        });

        this.loaderService.hideLoader()
        console.log('products', this.allProducts);
      },
      (error: any) => {
        this.loaderService.hideLoader()
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

  onIonInfinite(event: any) {
    this.page++; // Increase the page number
    this.getAllProducts(this.page);// Call your existing getAllShops method with the updated page number
    event.target.complete();
  }
}
