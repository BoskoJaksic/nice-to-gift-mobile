import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftDetailsPageRoutingModule } from './gift-details-routing.module';

import { GiftDetailsPage } from './gift-details.page';
import {ButtonsModule} from "../../../../shared/ui/buttons/buttons.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GiftDetailsPageRoutingModule,
        NgOptimizedImage,
        ButtonsModule
    ],
  declarations: [GiftDetailsPage]
})
export class GiftDetailsPageModule {}
