import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsTabPage } from './settings-tab.page';

describe('SettingsTabPage', () => {
  let component: SettingsTabPage;
  let fixture: ComponentFixture<SettingsTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SettingsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
