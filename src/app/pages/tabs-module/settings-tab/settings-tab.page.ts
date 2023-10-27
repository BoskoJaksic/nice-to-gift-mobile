import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../../core/keycloack/keycloack.service";
import {StorageService} from "../../../shared/services/storage.service";
import {CommonService} from "../../../services/common.service";
import {Camera, CameraResultType} from '@capacitor/camera';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {
  avatarImg: string | undefined;
  form: FormGroup;

  constructor(private keycloakService: KeycloakService,
              private formBuilder: FormBuilder,
              private storageService: StorageService,
              public commonService: CommonService) {
    this.avatarImg = ''
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['',Validators.required],
      surname: ['',Validators.required],

    });
  }

  async ngOnInit() {
    console.log('aaa', this.avatarImg)
    if (!this.avatarImg || this.avatarImg === '') {
      this.avatarImg = 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }
    let userEmail = await this.storageService.getItem('userEmail')
    let userName = await this.storageService.getItem('userName')
    let userSurname = await this.storageService.getItem('userSurname')
    this.form.patchValue({email: userEmail})
    this.form.patchValue({name: userName})
    this.form.patchValue({surname: userSurname})


  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    this.avatarImg = image.dataUrl
  };

  async logOut() {
    const refreshToken = await this.storageService.getToken('refresh_token')
    this.keycloakService.logout(refreshToken, 'logout').subscribe(r => {
      this.storageService.removeToken('token')
      this.storageService.removeToken('refresh_token')
      this.storageService.removeToken('userName')
      this.storageService.removeToken('userSurname')
      this.storageService.removeToken('userId')
      this.storageService.removeToken('userEmail')
      this.commonService.goToRoute('/')
    })
  }

  onSubmit() {
    console.log('dd',this.form.value)
  }
}
