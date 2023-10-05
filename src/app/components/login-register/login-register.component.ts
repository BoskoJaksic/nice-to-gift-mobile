import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  form: FormGroup;
  @Input() login: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, public commonService: CommonService) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('form', this.form.value)
    if (this.login) {
      //login here
      this.commonService.goToRoute('on-boarding')
    } else {
      //register here
    }

  }
}
