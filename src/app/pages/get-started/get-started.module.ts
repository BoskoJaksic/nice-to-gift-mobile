import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetStartedPageRoutingModule } from './get-started-routing.module';

import { GetStartedPage } from './get-started.page';
import {ButtonsModule} from "../../shared/ui/buttons/buttons.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GetStartedPageRoutingModule,
        NgOptimizedImage,
        ButtonsModule
    ],
  declarations: [GetStartedPage]
})
export class GetStartedPageModule {}
