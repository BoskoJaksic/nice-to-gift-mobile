import {Component, OnInit} from '@angular/core';
import {UserApiServices} from "../../../shared/services/user.api.services";
import {StorageService} from "../../../shared/services/storage.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
  avatarImg: string | undefined;
  userName: string = '';
  surname: string = '';
  gifts = [
    {
      isReceived:true,
      imgSrc:'./assets/images/mockSlika.png'
    },
    {
      isReceived:false,
      imgSrc:'./assets/images/home-gift-card.svg'
    }
  ]

  constructor(private userApiServices: UserApiServices,
              private loaderService: LoaderService,
              private route: ActivatedRoute,
              private storageService: StorageService,) {
    this.avatarImg = ''
  }


  ngOnInit() {
    this.route.params.subscribe(async params => {
      const paramId = params['id'];
      console.log('iddd',paramId)
      this.getUsersData();
      console.log('get metoda za poklone  sa loaderima ide ovdje');
      this.getGifts();
    })
    if (!this.avatarImg || this.avatarImg === '') {
      this.avatarImg = 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }

  }

  async getUsersData() {
    this.loaderService.showLoader()
    let userId = await this.storageService.getItem('userId')
    this.userApiServices.getUsersData(userId).subscribe(r => {
      this.avatarImg = r.base64Image
      this.userName = r.name
      this.surname = r.surname
      this.loaderService.hideLoader();
    })
  }

  getGifts() {

  }
}
