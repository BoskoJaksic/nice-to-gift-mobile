import {NgModule} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SecondaryButtonComponent} from "./secondary-button/secondary-button.component";
import {NgClass, NgIf, NgStyle} from "@angular/common";


@NgModule({
  declarations: [
    SecondaryButtonComponent
  ],
    imports: [
        IonicModule,
        NgClass,
        NgStyle,
        NgIf,
    ],
  exports: [
    SecondaryButtonComponent
  ]
})
export class ButtonsModule {
}
