import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../../services/common.service";
import {Share} from "@capacitor/share";

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.page.html',
  styleUrls: ['./gift-details.page.scss'],
})
export class GiftDetailsPage implements OnInit {
  orderId = ''
  imgSrc:any

  constructor(private route: ActivatedRoute,
              public commonService: CommonService,
  ) {
  }

  async shareLInk() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      // @ts-ignore
      this.orderId = params['orderId'];
      this.getGiftDetails()
      console.log('get metoda za gift details ide ovdje');
    })
  }

  getGiftDetails() {

  }
}
