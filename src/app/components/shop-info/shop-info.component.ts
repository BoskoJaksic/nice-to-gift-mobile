import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss'],
})
export class ShopInfoComponent implements OnInit, OnChanges {
  @Input() shopDetails: any
  days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shopDetails'] && changes['shopDetails'].currentValue) {
      const newShopDetails = changes['shopDetails'].currentValue;

        newShopDetails.workingHours.forEach((item:any) => {
          if (item.day >= 1 && item.day <= 7) {
            item.dayName = this.days[item.day - 1];
          }
          item.closingTime = item.closingTime.slice(0, -3);
          item.openingTime = item.openingTime.slice(0, -3);
        });

      console.log('Mapped shop details:', newShopDetails);
      this.shopDetails = newShopDetails;
    }
  }
}
