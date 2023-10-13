import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../../core/keycloack/keycloack.service";
import {StorageService} from "../../../shared/services/storage.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  constructor(private keycloakService: KeycloakService, private storageService: StorageService,
              private commonService: CommonService) {
  }

  ngOnInit() {
  }

  async logOut() {
    const refreshToken = await this.storageService.getToken('refresh_token')
    this.keycloakService.logout(refreshToken, 'logout').subscribe(r=>{
      this.storageService.removeToken('token')
      this.storageService.removeToken('refresh_token')
      this.commonService.goToRoute('/')
    })
  }
}
