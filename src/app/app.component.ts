import {Component, NgZone} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {StatusBar, Style} from '@capacitor/status-bar';
import { Stripe } from '@capacitor-community/stripe';
import {environment} from "../environments/environment";
import {LoaderService} from "./shared/services/loader.service";
import {App, URLOpenListenerEvent} from "@capacitor/app";
import { Router } from '@angular/router';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( public loaderService: LoaderService,private _ngZone: NgZone,private _router: Router) {
    this.initApp();
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

  initApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this._ngZone.run(() => {
        // Example url: https://my-ionic.app/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split(".app").pop();
        console.log("slug = ", slug);
        if (slug) {
          this._router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }
}
