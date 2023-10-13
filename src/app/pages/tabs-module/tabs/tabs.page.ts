import {Component} from '@angular/core';

@Component({
  selector: 'app-tabs-module',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTabIndex: number = 0;


  iconTabs = [
    './assets/icon/home-tab.svg',
    './assets/icon/gift-tab.svg',
    './assets/icon/maps-tab.svg',
    './assets/icon/profile-tab.svg',
    './assets/icon/settings-tab.svg',
  ]
  tabs = [
    'home-tab',
    'gift-tab',
    'maps-tab',
    'profile-tab',
    'settings-tab'
  ]
  labels = [
    'Home',
    'Gift',
    'Maps',
    'Profile',
    'Settings'
  ]


  constructor() {

  }

  ionTabsWillChange(e: any) {
    const selectedIndex = this.tabs.indexOf(e.tab);
    if (selectedIndex !== -1) {
      this.iconTabs[this.selectedTabIndex] = `./assets/icon/${this.tabs[this.selectedTabIndex]}.svg`;
      this.iconTabs[selectedIndex] = `./assets/icon/${e.tab}-filled.svg`;
      this.selectedTabIndex = selectedIndex;
    }
  }

}
