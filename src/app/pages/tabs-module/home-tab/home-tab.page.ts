import { Component, OnInit } from '@angular/core';
import {cards} from "../../../shared/mocks";
@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
cards = cards;
  constructor() { }

  ngOnInit() {
  }

}
