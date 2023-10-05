import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsTabPageRoutingModule } from './maps-tab-routing.module';

import { MapsTabPage } from './maps-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsTabPageRoutingModule
  ],
  declarations: [MapsTabPage]
})
export class MapsTabPageModule {}
