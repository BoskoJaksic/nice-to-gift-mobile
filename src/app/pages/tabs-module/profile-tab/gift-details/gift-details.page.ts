import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../../services/common.service";

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.page.html',
  styleUrls: ['./gift-details.page.scss'],
})
export class GiftDetailsPage implements OnInit {
  imgSrc = ''

  constructor(private route: ActivatedRoute,
              public commonService: CommonService,
  ) {
  }
  shareLInk() {
    console.log('sharex')

  }
  ngOnInit() {
    this.route.params.subscribe(async params => {
      // @ts-ignore
      this.imgSrc = params['imgSrc'];
      console.log('get metoda za gift details ide ovdje');
    })
  }
}
