import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-horizontal-shop-view',
  templateUrl: './horizontal-shop-view.component.html',
  styleUrls: ['./horizontal-shop-view.component.scss'],
})
export class HorizontalShopViewComponent implements OnInit {
  @Input() cards: any
  @Input() title = ''
  @Input() seeAll: boolean = true;

  constructor() {
  }

  ngOnInit() {
    console.log('car',this.cards)
  }

}
