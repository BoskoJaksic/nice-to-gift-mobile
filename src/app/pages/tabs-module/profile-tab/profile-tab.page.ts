import { Component, OnInit } from '@angular/core';
import {UserApiServices} from "../../../shared/services/user.api.services";
import {StorageService} from "../../../shared/services/storage.service";

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
  avatarImg: string | undefined;
  userName: string = '';
  surname: string = '';

  constructor( private userApiServices: UserApiServices,
               private storageService: StorageService,) {
    this.avatarImg = ''
  }

  ngOnInit() {
    if (!this.avatarImg || this.avatarImg === '') {
      this.avatarImg = 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }
    this.getUsersData();
  }
  async getUsersData() {
    let userId = await this.storageService.getItem('userId')
    this.userApiServices.getUsersData(userId).subscribe(r => {
      this.avatarImg = r.base64Image
      this.userName = r.name
      this.surname = r.surname
    })
  }
}
