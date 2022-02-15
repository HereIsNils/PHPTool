import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManagementViewComponent } from './update-management-view.component';

describe('UpdateManagementViewComponent', () => {
  let component: UpdateManagementViewComponent;
  let fixture: ComponentFixture<UpdateManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateManagementViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
