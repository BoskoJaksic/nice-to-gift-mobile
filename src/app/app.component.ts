import {Component, NgZone} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Stripe} from '@capacitor-community/stripe';
import {environment} from "../environments/environment";
import {LoaderService} from "./shared/services/loader.service";
import {App, URLOpenListenerEvent} from "@capacitor/app";
import {Router} from '@angular/router';
import {AppPathService} from "./services/app-path.service";
import {CommonService} from "./services/common.service";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isWebPlatform: boolean = false;


  constructor(public loaderService: LoaderService,
              public commonService: CommonService,
              private appPathService: AppPathService,
              private ngZone: NgZone, private router: Router) {
    this.initApp();
    this.initStatusBar();
    this.initStripe();
    this.determinePlatform()
  }

  determinePlatform() {
    this.isWebPlatform = this.commonService.determinePlatform() === 'web';
  }

  initStripe() {
    Stripe.initialize({
      publishableKey: environment.stripe.publishKey,
    });
  }


  initStatusBar() {
    StatusBar.setStyle({style: Style.Light});
    StatusBar.setOverlaysWebView({ overlay: true });

  }

  ngOnInit() {

  }

  initApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.ngZone.run(() => {
        const slug = event.url.split(".net");
        const appPath = slug.pop()
        if (appPath) {
          this.appPathService.setAppPath(appPath)
          this.router.navigateByUrl(appPath);
        }
      });
    });
  }
}
