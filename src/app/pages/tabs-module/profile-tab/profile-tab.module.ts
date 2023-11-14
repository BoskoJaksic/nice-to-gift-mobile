import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileTabPageRoutingModule } from './profile-tab-routing.module';

import { ProfileTabPage } from './profile-tab.page';
import {MatTabsModule} from "@angular/material/tabs";
import {GiftCardComponent} from "../../../components/gift-card/gift-card.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfileTabPageRoutingModule,
        NgOptimizedImage,
        MatTabsModule,
    ],
  declarations: [ProfileTabPage,GiftCardComponent]
})
export class ProfileTabPageModule {}
