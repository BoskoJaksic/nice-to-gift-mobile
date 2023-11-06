import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../../services/common.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.page.html',
  styleUrls: ['./add-payment-method.page.scss'],
})
export class AddPaymentMethodPage implements OnInit {
  form: FormGroup;

  constructor(public commonService: CommonService,
              private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      cardholderName: ['', Validators.required],
      cardNum1: ['', Validators.required],
      cardNum2: ['', Validators.required],
      cardNum3: ['', Validators.required],
      cardNum4: ['', Validators.required],
      mm: ['', Validators.required],
      yy: ['', Validators.required],
      cvc: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let objToSend = {
      Number:`${this.form.value.cardNum1 + this.form.value.cardNum2 + this.form.value.cardNum3 + this.form.value.cardNum4} `,
      ExpMonth: `${this.form.value.mm}§`,
      ExpYear: `${this.form.value.yy}`,
      Cvc: `${this.form.value.cvc}`,
    }

    console.log('dd',objToSend)

  }
}
