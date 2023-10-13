import { Component, OnInit } from '@angular/core';
import {cards} from "../../shared/mocks";

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

    protected readonly cards = cards;
}
