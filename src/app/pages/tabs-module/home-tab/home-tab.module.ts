import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTabPageRoutingModule } from './home-tab-routing.module';

import { HomeTabPage } from './home-tab.page';
import {HeaderComponent} from "../../../components/header/header.component";
import {TabsPageModule} from "../tabs/tabs.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTabPageRoutingModule,
    NgOptimizedImage,
    TabsPageModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HomeTabPage, HeaderComponent]
})
export class HomeTabPageModule {}
