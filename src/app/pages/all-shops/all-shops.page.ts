import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../shared/services/navigation.service";
import {cards} from "../../shared/mocks";

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.page.html',
  styleUrls: ['./all-shops.page.scss'],
})
export class AllShopsPage implements OnInit {
  cards = cards

  constructor(private navigation: NavigationService) {
  }

  ngOnInit() {
  }

  goBackToPrevPage(): void {
    this.navigation.back();
  }

  onIonInfinite($event: any) {

  }
}
