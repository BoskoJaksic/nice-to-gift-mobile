import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(
    private platform: Platform,
    private router: Router,
  ) {

  }


  goToRoute(whereTo: string) {
    this.router.navigate([whereTo])
    return
  }
}
