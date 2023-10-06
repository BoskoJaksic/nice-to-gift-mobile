import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftTabPageRoutingModule } from './gift-tab-routing.module';

import { GiftTabPage } from './gift-tab.page';
import {TabsPageModule} from "../tabs/tabs.module";
import {HomeTabPageModule} from "../home-tab/home-tab.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftTabPageRoutingModule,
    NgOptimizedImage,
    TabsPageModule,
    HomeTabPageModule
  ],
  declarations: [GiftTabPage]
})
export class GiftTabPageModule {}
