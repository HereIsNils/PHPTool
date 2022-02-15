import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhpToolComponent } from './php-tool.component';

describe('PhpToolComponent', () => {
  let component: PhpToolComponent;
  let fixture: ComponentFixture<PhpToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhpToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhpToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
