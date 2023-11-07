import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPaymentMethodPageRoutingModule } from './add-payment-method-routing.module';

import { AddPaymentMethodPage } from './add-payment-method.page';
import {ButtonsModule} from "../../../../shared/ui/buttons/buttons.module";
import {InputModule} from "../../../../shared/ui/inputs/inputs.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddPaymentMethodPageRoutingModule,
        NgOptimizedImage,
        ButtonsModule,
        InputModule,
        ReactiveFormsModule
    ],
  declarations: [AddPaymentMethodPage]
})
export class AddPaymentMethodPageModule {}
