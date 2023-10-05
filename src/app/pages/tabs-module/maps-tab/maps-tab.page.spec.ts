import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsTabPage } from './maps-tab.page';

describe('MapsTabPage', () => {
  let component: MapsTabPage;
  let fixture: ComponentFixture<MapsTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MapsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
