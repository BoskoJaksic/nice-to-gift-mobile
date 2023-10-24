import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @Input() amount: any
  @Input() cardCheckout: boolean = false;
  @Input() goTo: string = '';
  @Input() isFromCheckout: boolean = false;

  constructor(public commonService:CommonService,private router: Router) {
  }

  ngOnInit() {
  }

  goToRoute() {
    const navigationExtras = {
      state: {
        isFromCheckout: true // Dodajte custom podatak u state objekt
      }
    };
    if (this.isFromCheckout){
      this.router.navigate(['tabs/tabs/gift-tab'], navigationExtras);
    }else{
      this.commonService.goToRoute(this.goTo);
    }
  }
}
