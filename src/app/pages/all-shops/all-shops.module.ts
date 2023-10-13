import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllShopsPageRoutingModule } from './all-shops-routing.module';

import { AllShopsPage } from './all-shops.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllShopsPageRoutingModule,
    NgOptimizedImage,
    SharedModule
  ],
  declarations: [AllShopsPage]
})
export class AllShopsPageModule {}
