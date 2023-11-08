import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() {
  }

  // async showLoader() {
  //   this.loader = await this.loadingController.create({
  //     message: '<ion-img src="./assets/images/visa.png" alt="loading..."></ion-img>',
  //     cssClass: 'scale-down-center',
  //     translucent: true,
  //     showBackdrop: false,
  //     spinner: null,
  //     duration: 200000
  //   });
  //   await this.loader.present();
  // }
  //
  // hideLoader() {
  //   if (this.loader) {
  //     this.loader.dismiss();
  //   }
  // }

  private loaderVisibilitySubject = new BehaviorSubject<boolean>(false);
  loaderVisibility$ = this.loaderVisibilitySubject.asObservable();

  showLoader() {
    this.loaderVisibilitySubject.next(true);
  }

  hideLoader() {
    this.loaderVisibilitySubject.next(false);
  }
}
