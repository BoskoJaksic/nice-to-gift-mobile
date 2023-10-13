import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomeTabPageRoutingModule} from './home-tab-routing.module';

import {HomeTabPage} from './home-tab.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTabPageRoutingModule,
    NgOptimizedImage,
    SharedModule
  ],
  exports: [

  ],
  declarations: [HomeTabPage]
})
export class HomeTabPageModule {
}
