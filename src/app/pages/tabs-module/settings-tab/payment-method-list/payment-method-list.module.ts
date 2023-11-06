import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentMethodListPageRoutingModule } from './payment-method-list-routing.module';

import { PaymentMethodListPage } from './payment-method-list.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PaymentMethodListPageRoutingModule,
        NgOptimizedImage
    ],
  declarations: [PaymentMethodListPage]
})
export class PaymentMethodListPageModule {}
