import { Component, OnInit } from '@angular/core';
import {cards} from "../../../shared/mocks";

@Component({
  selector: 'app-gift-tab',
  templateUrl: './gift-tab.page.html',
  styleUrls: ['./gift-tab.page.scss'],
})
export class GiftTabPage implements OnInit {
  cards = cards;

  constructor() { }

  ngOnInit() {
  }

}
