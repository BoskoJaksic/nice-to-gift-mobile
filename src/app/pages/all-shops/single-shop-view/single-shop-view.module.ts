import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleShopViewPageRoutingModule} from './single-shop-view-routing.module';

import {SingleShopViewPage} from './single-shop-view.page';
import {MaterialModule} from "../../../shared/material.module";
import {ShopReviewsComponent} from "../../../components/shop-reviews/shop-reviews.component";
import {ShopProductsComponent} from "../../../components/shop-products/shop-products.component";
import {ButtonsModule} from "../../../shared/ui/buttons/buttons.module";
import {InputModule} from "../../../shared/ui/inputs/inputs.module";
import {SharedModule} from "../../../shared/shared.module";
import {ShopInfoComponent} from "../../../components/shop-info/shop-info.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleShopViewPageRoutingModule,
        MaterialModule,
        NgOptimizedImage,
        ButtonsModule,
        InputModule,
        SharedModule

    ],
  declarations: [SingleShopViewPage, ShopReviewsComponent, ShopProductsComponent, ShopInfoComponent]
})
export class SingleShopViewPageModule {
}
