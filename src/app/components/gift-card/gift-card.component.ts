import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss'],
})
export class GiftCardComponent implements OnInit {
  @Input() giftObj: any;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {

  }



  goToGiftDetails() {
    if (this.giftObj.isReceived) {
      this.commonService.goToRoute('tabs/tabs/profile-tab/false/gift-details', this.giftObj.imgSrc)
    }
  }
}
