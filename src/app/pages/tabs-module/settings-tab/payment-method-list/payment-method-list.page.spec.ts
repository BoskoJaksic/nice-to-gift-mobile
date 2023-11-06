import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentMethodListPage } from './payment-method-list.page';

describe('PaymentMethodListPage', () => {
  let component: PaymentMethodListPage;
  let fixture: ComponentFixture<PaymentMethodListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentMethodListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
