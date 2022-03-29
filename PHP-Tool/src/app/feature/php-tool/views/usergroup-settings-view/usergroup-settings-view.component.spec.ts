import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupSettingsViewComponent } from './usergroup-settings-view.component';

describe('UsergroupSettingsViewComponent', () => {
  let component: UsergroupSettingsViewComponent;
  let fixture: ComponentFixture<UsergroupSettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergroupSettingsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
