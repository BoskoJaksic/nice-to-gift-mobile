import { NgModule } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HorizontalShopViewComponent} from "../components/horizontal-shop-view/horizontal-shop-view.component";
import {RouterLink} from "@angular/router";
import {CheckoutComponent} from "../components/checkout-button/checkout.component";
import {OrderConfirmedComponent} from "../components/order-confirmed/order-confirmed.component";
import {ButtonsModule} from "./ui/buttons/buttons.module";
import {CircleAnimationComponent} from "./ui/circle-animation/circle-animation.component";
import {NotLoggedInStateComponent} from "../components/not-logged-in-state/not-logged-in-state.component";
@NgModule({
  declarations: [
    HeaderComponent,
    HorizontalShopViewComponent,
    CheckoutComponent,
    OrderConfirmedComponent,
    CircleAnimationComponent,
    NotLoggedInStateComponent
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
    OrderConfirmedComponent,
    CircleAnimationComponent,
    NotLoggedInStateComponent
  ]
})
export class SharedModule { }
