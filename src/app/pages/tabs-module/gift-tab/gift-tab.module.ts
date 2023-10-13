import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GiftTabPageRoutingModule } from './gift-tab-routing.module';

import { GiftTabPage } from './gift-tab.page';
import {IonicModule} from "@ionic/angular";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GiftTabPageRoutingModule,
    NgOptimizedImage,
    IonicModule,
    SharedModule,
  ],
  declarations: [GiftTabPage]
})
export class GiftTabPageModule {}
