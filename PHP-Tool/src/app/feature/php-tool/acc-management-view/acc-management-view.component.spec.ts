import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccManagementViewComponent } from './acc-management-view.component';

describe('AccManagementViewComponent', () => {
  let component: AccManagementViewComponent;
  let fixture: ComponentFixture<AccManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccManagementViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
