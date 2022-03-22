import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevuserTableComponent } from './devuser-table.component';

describe('DevuserTableComponent', () => {
  let component: DevuserTableComponent;
  let fixture: ComponentFixture<DevuserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevuserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevuserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
