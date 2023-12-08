import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss'],
})
export class GiftCardComponent implements OnInit {
  @Input() giftObj: any;
  @Input() isReceived: boolean = false;

  constructor(private commonService: CommonService,
              private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {

  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const transformedDate = this.datePipe.transform(date, 'EEE dd MMM');
    return transformedDate ? transformedDate.toUpperCase() : '';
  }

  getFormattedStatus(): string {
    let formattedStatus = (this.giftObj?.orderStatus || '');
    if (formattedStatus === 'AtStore') {
      formattedStatus = 'At Store';
    } else if (formattedStatus === 'PickedUp') {
      formattedStatus = 'Picked Up';
    }
    return formattedStatus;
  }

  goToGiftDetails() {
    if (!this.isReceived) {
      this.commonService.goToRoute('tabs/tabs/profile-tab/false/gift-details', this.giftObj.id)
    }
  }
}
