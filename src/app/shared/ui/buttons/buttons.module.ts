import {NgModule} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SecondaryButtonComponent} from "./secondary-button/secondary-button.component";
import {NgClass, NgStyle} from "@angular/common";


@NgModule({
  declarations: [
    SecondaryButtonComponent
  ],
  imports: [
    IonicModule,
    NgClass,
    NgStyle,
  ],
  exports: [
    SecondaryButtonComponent
  ]
})
export class ButtonsModule {
}
