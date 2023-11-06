import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPaymentMethodPage } from './add-payment-method.page';

describe('AddPaymentMethodPage', () => {
  let component: AddPaymentMethodPage;
  let fixture: ComponentFixture<AddPaymentMethodPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPaymentMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
