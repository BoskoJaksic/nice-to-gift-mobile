import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-gift-card',
  templateUrl: './home-gift-card.component.html',
  styleUrls: ['./home-gift-card.component.scss'],
})
export class HomeGiftCardComponent  implements OnInit {
  @Input() giftData: any;
  @Input() daysLeftToPickup: any;
  @Input() formatedDate: any;

  constructor() { }

  ngOnInit() {}

}
