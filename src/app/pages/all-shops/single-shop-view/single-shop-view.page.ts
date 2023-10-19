import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from "../../../shared/services/navigation.service";
import {cards} from "../../../shared/mocks";

@Component({
  selector: 'app-single-shop-view',
  templateUrl: './single-shop-view.page.html',
  styleUrls: ['./single-shop-view.page.scss'],
})
export class SingleShopViewPage implements OnInit {
  // shopId: String = ''
  shopImg: String = ''
  cards = cards
  totalAmountFromChild: number = 0;

  constructor(private _Activatedroute: ActivatedRoute, private navigation: NavigationService) {
  }

  ngOnInit() {
    // this.shopId = this._Activatedroute.snapshot.params["id"];
    this.shopImg = this._Activatedroute.snapshot.params["id"];
    console.log('ddd', this.shopImg)
  }
  handleTotalAmount(totalAmount: number) {
    this.totalAmountFromChild = totalAmount;
  }
  goBackToPrevPage(): void {
    this.navigation.back();
  }
}
