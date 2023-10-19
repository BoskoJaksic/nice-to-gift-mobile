import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleShopViewPage } from './single-shop-view.page';

describe('SingleShopViewPage', () => {
  let component: SingleShopViewPage;
  let fixture: ComponentFixture<SingleShopViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingleShopViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
