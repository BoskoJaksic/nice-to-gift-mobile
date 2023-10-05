import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiftTabPage } from './gift-tab.page';

describe('GiftTabPage', () => {
  let component: GiftTabPage;
  let fixture: ComponentFixture<GiftTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GiftTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
