import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsTabPageRoutingModule } from './maps-tab-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MapsTabPage } from './maps-tab.page';
import {MapsDetailsComponent} from "../../../components/maps-details/maps-details.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsTabPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MapsTabPage, MapsDetailsComponent]
})
export class MapsTabPageModule {}
