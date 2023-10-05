import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnBoardingPageRoutingModule } from './on-boarding-routing.module';

import { OnBoardingPage } from './on-boarding.page';
import {Slide1Component} from "../../components/swiper/slide1/slide1.component";
import {Slide2Component} from "../../components/swiper/slide2/slide2.component";
import {Slide3Component} from "../../components/swiper/slide3/slide3.component";
import {ButtonsModule} from "../../shared/ui/buttons/buttons.module";
import {Slide4Component} from "../../components/swiper/slide4/slide4.component";
import {TextComponent} from "./components/text/text.component";

@NgModule({

  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardingPageRoutingModule,
    ButtonsModule,
    NgOptimizedImage
  ],
  declarations: [OnBoardingPage, Slide1Component, Slide2Component, Slide3Component, Slide4Component, TextComponent]
})
export class OnBoardingPageModule {}
