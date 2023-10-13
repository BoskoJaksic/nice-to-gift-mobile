import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllShopsPage } from './all-shops.page';

describe('AllShopsPage', () => {
  let component: AllShopsPage;
  let fixture: ComponentFixture<AllShopsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllShopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
