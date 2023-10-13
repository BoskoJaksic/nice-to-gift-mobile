import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common.service";
import {KeycloakService} from "../../core/keycloack/keycloack.service";
import {StorageService} from "../../shared/services/storage.service";
import {ApiService} from "../../core/api.service";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  form: FormGroup;
  @Input() login: boolean = true;
  errorMessage: String = ''

  constructor(private formBuilder: FormBuilder,
              public commonService: CommonService,
              private keycloakService: KeycloakService,
              private storageService: StorageService,
              private apiService: ApiService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  ngOnInit() {
  }

  afterLoginRedirect(response: any) {
    const decodedToken = jwt_decode(response.access_token);
    // @ts-ignore
    if (decodedToken.firstLogin){
      this.apiService.put('Users/firstLogin', {email:this.form.value.email}).subscribe();
      this.commonService.goToRoute('on-boarding')
    }else{
      this.commonService.goToRoute('tabs/tabs/home-tab')
    }
  }

  loginUser() {
    this.keycloakService.login(this.form.value.email, this.form.value.password).subscribe(r => {
      this.storageService.setToken('token', r.access_token)
      this.storageService.setToken('refresh_token', r.refresh_token)
      this.afterLoginRedirect(r)
    }, error => {
      console.log('err', error)
      if (error.status === 401) {
        this.errorMessage = 'Invalid user credentials'
      }
    })
  }

  registerUser() {
    let dataToSend = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.apiService.post('Users/register', dataToSend).subscribe(r => {
    }, error => {
      console.log('err reg', error)
      if (error.status === 400) {
        this.errorMessage = "Can't login with this credentials"
      }
    })
  }

  onSubmit() {
    console.log('form', this.form.value)
    if (this.login) {
      this.loginUser()
    } else {
      this.registerUser()
    }
  }
}
