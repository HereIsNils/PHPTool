import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestuserTableComponent } from './testuser-table.component';

describe('TestuserTableComponent', () => {
  let component: TestuserTableComponent;
  let fixture: ComponentFixture<TestuserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestuserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestuserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
