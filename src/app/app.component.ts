import {Component} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {StatusBar, Style} from '@capacitor/status-bar';
import { Stripe } from '@capacitor-community/stripe';
import {environment} from "../environments/environment";
import {LoaderService} from "./shared/services/loader.service";

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( public loaderService: LoaderService,) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishKey,
    });
    const options = {
      overlay: true
    };
    StatusBar.setStyle({style:Style.Light});
    StatusBar.setOverlaysWebView(options);
  }
  ngOnInit() {

  }
}
