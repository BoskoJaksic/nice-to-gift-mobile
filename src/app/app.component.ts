import {Component} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {StatusBar, Style} from '@capacitor/status-bar';
import { Stripe } from '@capacitor-community/stripe';
import {environment} from "../environments/environment";

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    Stripe.initialize({
      publishableKey: environment.stripe.publishKey,
    });
  }
  ngOnInit() {
    const options = {
      overlay: true
    };
    StatusBar.setStyle({style:Style.Light});
    StatusBar.setOverlaysWebView(options);
  }


}
