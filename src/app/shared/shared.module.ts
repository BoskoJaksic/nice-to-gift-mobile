import { NgModule } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HorizontalShopViewComponent} from "../components/horizontal-shop-view/horizontal-shop-view.component";
import {RouterLink} from "@angular/router";
@NgModule({
  declarations: [
    HeaderComponent,
    HorizontalShopViewComponent,
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
  ]
})
export class SharedModule { }
