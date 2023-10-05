import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {LoginRegisterComponent} from "../../components/login-register/login-register.component";
import {InputModule} from "../../shared/ui/inputs/inputs.module";
import {ButtonsModule} from "../../shared/ui/buttons/buttons.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        NgOptimizedImage,
        InputModule,
        ReactiveFormsModule,
        ButtonsModule
    ],
    exports: [
        LoginRegisterComponent
    ],
    declarations: [LoginPage, LoginRegisterComponent]
})
export class LoginPageModule {}
