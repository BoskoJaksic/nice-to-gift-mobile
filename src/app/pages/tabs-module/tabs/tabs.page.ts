import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-tabs-module',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  selectedTabIndex: number = 0;
  profileId: string = 'false';
  isNotMapTab: boolean = false;


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

  tabsRouting = [
    'home-tab',
    'gift-tab',
    'maps-tab',
    'profile-tab/false',
    'settings-tab'
  ]
  labels = [
    'Home',
    'Gift',
    'Maps',
    'Profile',
    'Settings'
  ]


  constructor(private commonService: CommonService) {

  }

  ngOnInit() {

  }

  ionTabsWillChange(e: any) {
    this.isNotMapTab = e.tab !== 'maps-tab';
    const selectedIndex = this.tabs.indexOf(e.tab);
    if (selectedIndex !== -1) {
      this.iconTabs[this.selectedTabIndex] = `./assets/icon/${this.tabs[this.selectedTabIndex]}.svg`;
      this.iconTabs[selectedIndex] = `./assets/icon/${e.tab}-filled.svg`;
      this.selectedTabIndex = selectedIndex;
    }
  }

  // getRouterLink(tab: string): string {
  //   if (tab === 'profile-tab') {
  //     return `/tabs/tabs/${tab}/${this.profileId}`;
  //   } else {
  //     return `/tabs/tabs/${tab}`;
  //   }
  // }

}
