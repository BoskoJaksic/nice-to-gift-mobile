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
import {Geolocation} from "@capacitor/geolocation";
import {GeocodingService} from "./shared/services/geo.service";
import {NavController} from "@ionic/angular";
import {LocalStorageService} from "./shared/services/local-storage.service";
import {StorageService} from "./shared/services/storage.service";

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
              private geocodingService: GeocodingService,
              private navCtrl: NavController,
              private storageService: StorageService,
              private localStorageService: LocalStorageService,
              private ngZone: NgZone, private router: Router) {
    window.screen.orientation.lock('portrait');
    this.initApp();
    this.initStatusBar();
    this.initStripe();
    this.determinePlatform();
    this.getCurrentLocation();
    this.removeKeys();
  }
  ngOnInit() {
    document.addEventListener('ionBackButton', (ev: any) => {
      ev.detail.register(10, () => {
        this.ngZone.run(() => {
          const urlTree = this.router.routerState.snapshot.root;
          console.log('Current URL Tree:', urlTree);
          this.navCtrl.navigateRoot('tabs/tabs/home-tab');
        });
      });
    });
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.geocodingService.setCoordinates(coordinates);
  }
  removeKeys() {
    this.storageService.removeToken('token')
    this.storageService.removeToken('refresh_token')
    this.storageService.removeToken('userName')
    this.storageService.removeToken('userSurname')
    this.storageService.removeToken('userId')
    this.storageService.removeToken('userEmail')
    this.storageService.removeToken('keycloak_id')
    this.localStorageService.clearLocalStorage();
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
    StatusBar.setOverlaysWebView({overlay: true});

  }

  initApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.ngZone.run(() => {
        const slug = event.url.split(".net");
        const appPath = slug.pop()
        if (appPath) {
          this.appPathService.setAppPath(appPath)
          this.router.navigate(['']);
        }
      });
    });
  }
}
