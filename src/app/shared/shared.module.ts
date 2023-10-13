import { NgModule } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HorizontalShopViewComponent} from "../components/horizontal-shop-view/horizontal-shop-view.component";
import {RouterLink} from "@angular/router";
import {ShopCardComponent} from "../components/shop-card/shop-card.component";
@NgModule({
  declarations: [
    HeaderComponent,
    HorizontalShopViewComponent,
    ShopCardComponent
  ],
  imports: [
    IonicModule,
    NgOptimizedImage,
    CommonModule,
    RouterLink
  ],
  exports: [
    HeaderComponent,
    HorizontalShopViewComponent,
    ShopCardComponent
  ]
})
export class SharedModule { }
