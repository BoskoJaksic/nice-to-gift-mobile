import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../../core/keycloack/keycloack.service";
import {StorageService} from "../../../shared/services/storage.service";
import {CommonService} from "../../../services/common.service";
import {Camera, CameraResultType} from '@capacitor/camera';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserApiServices} from "../../../shared/services/user.api.services";
import {ToasterService} from "../../../shared/services/toaster.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {AppPathService} from "../../../services/app-path.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {
  avatarImg: string | undefined;
  form: FormGroup;
  showSpinner: boolean = false;

  constructor(private keycloakService: KeycloakService,
              private formBuilder: FormBuilder,
              private storageService: StorageService,
              private toasterService: ToasterService,
              public userApiServices: UserApiServices,
              private loaderService: LoaderService,
              private localStorageService: LocalStorageService,
              private appPathService: AppPathService,
              public commonService: CommonService,
  ) {
    this.avatarImg = 'https://ionicframework.com/docs/img/demos/avatar.svg'
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      base64Image: [''],
      authId: [''],
    });
  }

  async ngOnInit() {
    if (this.userApiServices.isUserLoggedIn()) {
      let userEmail = await this.storageService.getItem('userEmail')
      let userName = await this.storageService.getItem('userName')
      let userSurname = await this.storageService.getItem('userSurname')
      this.form.patchValue({email: userEmail})
      this.form.patchValue({name: userName})
      this.form.patchValue({surname: userSurname})
      await this.getUsersData();
    }
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Delete',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  deleteAccount(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    if (ev.detail.role === 'confirm') {
      this.loaderService.showLoader();

       let userId = this.localStorageService.getUserId()

      this.userApiServices.deleteAccount(userId).subscribe({
        next:(r)=>{
          this.loaderService.hideLoader();
          this.toasterService.presentToast('Account successfully deleted','success');
          this.removeKeys();
        },error:(err)=>{
          this.loaderService.hideLoader();
          this.toasterService.presentToast('Something went wrong','danger');
        }
      })
    }
  }

  async getUsersData() {
    this.loaderService.showLoader();
    let userId = await this.storageService.getItem('userId')
    this.userApiServices.getUsersData(userId).subscribe(r => {
      if (r.base64Image) {
        this.avatarImg = r.base64Image
      }
      this.form.patchValue({base64Image: this.avatarImg})
      this.loaderService.hideLoader();
    }, error => {
      this.loaderService.hideLoader();
    })
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    this.avatarImg = image.dataUrl
    this.form.patchValue({base64Image: this.avatarImg})
  };


  async logOut() {
    const refreshToken = await this.storageService.getRefreshToken('refresh_token')
    this.keycloakService.logout(refreshToken, 'logout').subscribe(r => {
      this.removeKeys();
    })
  }

  removeKeys() {
    this.storageService.removeToken('token')
    this.storageService.removeToken('refresh_token')
    this.storageService.removeToken('userName')
    this.storageService.removeToken('userSurname')
    this.storageService.removeToken('userId')
    this.storageService.removeToken('userEmail')
    this.storageService.removeToken('keycloak_id')
    this.localStorageService.clearLocalStorage();
    this.appPathService.setAppPath('');
    this.commonService.goToRoute('/')
  }

  async onSubmit() {
    this.showSpinner = true;
    let userId = await this.storageService.getItem('userId')
    let authId = await this.storageService.getItem('keycloak_id')
    this.form.patchValue({authId: authId})
    this.userApiServices.updateUser(userId, this.form.value).subscribe(r => {
      this.toasterService.presentToast('User successfully updated', 'success');
      this.showSpinner = false;
    }, error => {
      this.toasterService.presentToast('Something went wrong', 'danger');
      this.showSpinner = false;
    })
  }
}
