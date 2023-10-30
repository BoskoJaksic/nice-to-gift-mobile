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
              private amountService: AmountService,
              private router: Router,
              private toasterService: ToasterService
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
    this.getFeeAmount();
  }

  getFeeAmount() {
// this.shopApiServices.getFeeAmount().subscribe(r => {
    //   this.feeAmount = r;
    // this.calculateTotalToPay()
    // }) todo set this inside subscribe
    this.amountService.setFeeAmount('3')
  }

  afterLoginRedirect(response: any) {
    const decodedToken = jwt_decode(response.access_token);
    // @ts-ignore
    this.storageService.setItem('userName', decodedToken.name)
    // @ts-ignore
    this.storageService.setItem('userSurname', decodedToken.lastname)
    // @ts-ignore
    this.storageService.setItem('userId', decodedToken.userId)
    // @ts-ignore
    this.storageService.setItem('userEmail', decodedToken.email)
    // @ts-ignore
    this.storageService.setItem('keycloak_id', decodedToken.keycloak_id)
    this.form.reset();
    // @ts-ignore
    if (decodedToken.firstLogin) {
      this.apiService.put('Users/firstLogin', {email: this.form.value.email}).subscribe();
      this.commonService.goToRoute('on-boarding')
    } else {
      this.commonService.goToRoute('tabs/tabs/home-tab')
    }
  }

  loginUser() {
    this.keycloakService.login(this.form.value.email, this.form.value.password).subscribe(r => {
      this.storageService.setItem('token', r.access_token)
      this.storageService.setItem('refresh_token', r.refresh_token)
      this.showSpinner = false;
      this.afterLoginRedirect(r)
    }, error => {
      console.log('err', error)
      this.showSpinner = false;
      if (error.status === 401) {
        this.errorMessage = 'Invalid user credentials'
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
        this.errorMessage = "Can't login with this credentials"
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
