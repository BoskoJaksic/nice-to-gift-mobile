import {Component, NgZone} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Stripe} from '@capacitor-community/stripe';
import {environment} from "../environments/environment";
import {LoaderService} from "./shared/services/loader.service";
import {App, URLOpenListenerEvent} from "@capacitor/app";
import {Router} from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  url: any

  constructor(public loaderService: LoaderService, private ngZone: NgZone, private router: Router) {
    this.initApp();
    Stripe.initialize({
      publishableKey: environment.stripe.publishKey,
    });
    const options = {
      overlay: true
    };
    StatusBar.setStyle({style: Style.Light});
    StatusBar.setOverlaysWebView(options);
  }

  ngOnInit() {

  }

  checkAppLaunchUrl = () => {
    App.getLaunchUrl().then((url) => {
      console.log('Launch URL:', url);
      this.url = url
      // Ovdje možete izvršiti dalje radnje s dobivenim URL-om
    }).catch((error) => {
      console.error('Error getting launch URL:', error);
      // Obrada greške ako je potrebno
    });
  };

  initApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.ngZone.run(() => {
        // Example url: https://my-ionic.app/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split(".net/#/");
        const appPath = slug.pop()
        console.log("appPath = ", appPath);
        console.log("event = ", event);
        this.url = event.url
        if (appPath) {
          this.router.navigateByUrl(appPath);
        } else {
          this.router.navigateByUrl('on-boarding');
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }
}
