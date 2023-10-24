import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(
    private router: Router,
  ) {

  }


  goToRoute(whereTo: any,params?:any) {
    if (params){
      this.router.navigate([whereTo,params])
    }else{
      this.router.navigate([whereTo])
    }
    return
  }
}
