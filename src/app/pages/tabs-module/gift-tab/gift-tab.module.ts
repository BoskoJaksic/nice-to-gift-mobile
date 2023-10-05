import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftTabPageRoutingModule } from './gift-tab-routing.module';

import { GiftTabPage } from './gift-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftTabPageRoutingModule
  ],
  declarations: [GiftTabPage]
})
export class GiftTabPageModule {}
