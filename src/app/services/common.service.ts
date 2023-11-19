import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private router: Router,
    private platform: Platform
  ) {

  }

  determinePlatform(){
    return this.platform.is('mobileweb');
  }
  isIos() {
    return this.platform.is('ios');
  }

  goToRoute(whereTo: any, params?: any) {
    if (params) {
      this.router.navigate([whereTo, params])
    } else {
      this.router.navigate([whereTo])
    }
    return
  }

}
