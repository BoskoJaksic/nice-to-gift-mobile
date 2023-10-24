import { NgModule } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HorizontalShopViewComponent} from "../components/horizontal-shop-view/horizontal-shop-view.component";
import {RouterLink} from "@angular/router";
import {CheckoutComponent} from "../components/checkout-button/checkout.component";
import {OrderConfirmedComponent} from "../components/order-confirmed/order-confirmed.component";
import {ButtonsModule} from "./ui/buttons/buttons.module";
@NgModule({
  declarations: [
    HeaderComponent,
    HorizontalShopViewComponent,
    CheckoutComponent,
    OrderConfirmedComponent
  ],
  imports: [
    IonicModule,
    NgOptimizedImage,
    CommonModule,
    RouterLink,
    ButtonsModule
  ],
  exports: [
    HeaderComponent,
    HorizontalShopViewComponent,
    CheckoutComponent,
    OrderConfirmedComponent
  ]
})
export class SharedModule { }
