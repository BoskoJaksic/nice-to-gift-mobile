import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common.service";
import {KeycloakService} from "../../core/keycloack/keycloack.service";
import {StorageService} from "../../shared/services/storage.service";
import {ApiService} from "../../core/api.service";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {ToasterService} from "../../shared/services/toaster.service";
import {AmountService} from "../../shared/services/ammount.service";
import {AppPathService} from "../../services/app-path.service";
import {ShopApiServices} from "../../shared/services/shop-api.services";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  form: FormGroup;
  @Input() login: boolean = true;
  errorMessage: String = ''
  currentRoute = ''
  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public commonService: CommonService,
              private keycloakService: KeycloakService,
              private storageService: StorageService,
              private apiService: ApiService,
              private router: Router,
              private appPathService: AppPathService,
              private toasterService: ToasterService,
              private localStorageService: LocalStorageService,

  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: [''],
      surname: [''],

    });
    this.currentRoute = this.router.url;

  }

  ngOnInit() {
  }


  afterLoginRedirect(response: any) {
    const decodedToken = jwt_decode(response.access_token);
    // @ts-ignore
    const promises = [
      this.storageService.setItem('token', response.access_token),
      // @ts-ignore
      this.storageService.setItem('refresh_token', response.refresh_token),
      // @ts-ignore
      this.storageService.setItem('userName', decodedToken.name),
      // @ts-ignore
      this.storageService.setItem('userSurname', decodedToken.lastname),
      // @ts-ignore
      this.storageService.setItem('userId', decodedToken.userId),
      // @ts-ignore
      this.storageService.setItem('userEmail', decodedToken.email),
      // @ts-ignore
      this.storageService.setItem('keycloak_id', decodedToken.keycloak_id),
      // @ts-ignore
      this.localStorageService.setUserName(decodedToken.name),
      // @ts-ignore
      this.localStorageService.setUserEmail(decodedToken.email),
      // @ts-ignore
      this.localStorageService.setUserId(decodedToken.userId),
      // @ts-ignore
      this.localStorageService.setUserToken(response.access_token),
      // @ts-ignore
      this.localStorageService.setUserRefreshToken(response.refresh_token),

    ]

    Promise.all(promises)
      .then(() => {
        let path = this.appPathService.getAppPath()
        if (path && path !== '') {
          this.router.navigateByUrl(path);
          this.form.reset();
        } else {
          // @ts-ignore
          if (decodedToken.firstLogin) {
            this.apiService.put('Users/firstLogin', {email: this.form.value.email}).subscribe();
            this.commonService.goToRoute('on-boarding')
          } else {
            this.commonService.goToRoute('tabs/tabs/home-tab')
          }
          this.form.reset();
        }
      })
      .catch((error) => {
        console.error('Greška pri postavljanju podataka u storageService:', error);
      });
  }

  loginUser() {
    this.keycloakService.login(this.form.value.email, this.form.value.password).subscribe(r => {
      this.showSpinner = false;
      this.afterLoginRedirect(r)
    }, error => {
      console.log('err', error)
      this.showSpinner = false;
      if (error.status === 400) {
        this.toasterService.presentToast('Invalid user credentials','warning')
      }else{
        this.toasterService.presentToast('Something went wrong','danger')
      }
    })
  }

  registerUser() {
    let dataToSend = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      surname: this.form.value.surname
    }
    this.apiService.post('Users/register', dataToSend).subscribe(r => {
      this.toasterService.presentToast('User successfully registered', 'success')
      this.commonService.goToRoute('login-register')
      this.showSpinner = false;

    }, error => {
      console.log('err reg', error)
      this.showSpinner = false;
      if (error.status === 400) {
        this.toasterService.presentToast("Can't sign up with this credentials",'warning')
      }else{
        this.toasterService.presentToast('Something went wrong','danger')
      }

    })
  }

  onSubmit() {
    this.showSpinner = true;
    console.log('form', this.form.value)
    if (this.login) {
      this.loginUser()
    } else {
      this.registerUser()
    }
  }
}
