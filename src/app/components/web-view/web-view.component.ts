import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-web-view',
  templateUrl: './web-view.component.html',
  styleUrls: ['./web-view.component.scss'],
})
export class WebViewComponent  implements OnInit {

  constructor(public commonService:CommonService) { }

  ngOnInit() {}

  downloadAppStore() {
    const appStoreLink = 'https://apps.apple.com/me/app/nicetogift/id6473922121';
    window.open(appStoreLink, '_blank');

  }

  downloadPlayStore() {
    const appStoreLink = 'https://play.google.com/store/apps/details?id=com.niceToGift.myapp';
    window.open(appStoreLink, '_blank');
  }
}
