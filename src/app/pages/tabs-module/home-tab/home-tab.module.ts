import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomeTabPageRoutingModule} from './home-tab-routing.module';

import {HomeTabPage} from './home-tab.page';
import {SharedModule} from "../../../shared/shared.module";
import {HomeGiftCardNoneComponent} from "../../../components/home-gift-card-none/home-gift-card-none.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTabPageRoutingModule,
    NgOptimizedImage,
    SharedModule
  ],
  providers: [
    DatePipe,

  ],
  exports: [

  ],
  declarations: [HomeTabPage, HomeGiftCardNoneComponent]
})
export class HomeTabPageModule {
}
