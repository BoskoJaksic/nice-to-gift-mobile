import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsTabPageRoutingModule } from './settings-tab-routing.module';

import { SettingsTabPage } from './settings-tab.page';
import {InputModule} from "../../../shared/ui/inputs/inputs.module";
import {ButtonsModule} from "../../../shared/ui/buttons/buttons.module";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SettingsTabPageRoutingModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        InputModule,
        ButtonsModule,
        SharedModule
    ],
  declarations: [SettingsTabPage]
})
export class SettingsTabPageModule {}
