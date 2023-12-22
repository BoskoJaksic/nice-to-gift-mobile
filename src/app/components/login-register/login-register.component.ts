import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common.service";
import {KeycloakService} from "../../core/keycloack/keycloack.service";
import {StorageService} from "../../shared/services/storage.service";
import {ApiService} from "../../core/api.service";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {ToasterService} from "../../shared/services/toaster.service";
import {AppPathService} from "../../services/app-path.service";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {Subscription} from "rxjs";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  form: FormGroup;
  @Input() login: boolean = true;
  @ViewChild('formContent') formContent!: ElementRef;
  showGuestLogin = true;
  errorMessage: String = ''
  currentRoute = ''
  showSpinner: boolean = false;
  keyboardShowSubscription: Subscription;
  keyboardHideSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              public commonService: CommonService,
              private keycloakService: KeycloakService,
              private storageService: StorageService,
              private apiService: ApiService,
              private router: Router,
              private appPathService: AppPathService,
              private toasterService: ToasterService,
              private localStorageService: LocalStorageService,
              private platform: Platform
  ) {
    this.keyboardShowSubscription = this.platform.keyboardDidShow.subscribe((ev: any) => {
      const {keyboardHeight} = ev;
      this.adjustFormOnKeyboardShow(keyboardHeight);
    });

    this.keyboardHideSubscription = this.platform.keyboardDidHide.subscribe(() => {
      this.resetFormOnKeyboardHide();
    });
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: [''],
      surname: [''],

    });
    this.currentRoute = this.router.url;

  }

  ngOnInit() {
    let path = this.appPathService.getAppPath();
    this.showGuestLogin = !(path && path !== '');
  }

  adjustFormOnKeyboardShow(keyboardHeight: number) {
    const formContent = document.querySelector('.form-content') as HTMLElement;
    if (formContent) {
      formContent.style.marginBottom = `${keyboardHeight}px`;
      // You might want to adjust other elements as well, e.g., scrolling the focused input into view.
      const activeElement = document.activeElement;
      if (activeElement) {
        activeElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
      }
    }
  }

  resetFormOnKeyboardHide() {
    const formContent = document.querySelector('.form-content') as HTMLElement;
    if (formContent) {
      formContent.style.marginBottom = '0';
      // Reset any other adjustments made when the keyboard was active.
    }
    if (this.formContent) {
      const formContentEl: HTMLElement = this.formContent.nativeElement;
      formContentEl.style.marginBottom = '0';
      // Reset any other adjustments made when the keyboard was active.
    }
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
        this.errorMessage = '';
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
      // this.errorMessage = error.message;
      this.showSpinner = false;
      if (error.status === 401) {
        this.toasterService.presentToast('Invalid user credentials', 'warning')
      } else {
        this.toasterService.presentToast('Something went wrong', 'danger')
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
        this.toasterService.presentToast("Can't sign up with this credentials", 'warning')
      } else {
        this.toasterService.presentToast('Something went wrong', 'danger')
      }

    })
  }

  ngOnDestroy() {
    this.keyboardShowSubscription.unsubscribe();
    this.keyboardHideSubscription.unsubscribe();
  }

  redirectToGiftTab() {
    this.commonService.goToRoute('tabs/tabs/gift-tab')
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
