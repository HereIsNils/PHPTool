import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateUsergroupComponent } from './dialog-create-usergroup.component';

describe('DialogCreateUsergroupComponent', () => {
  let component: DialogCreateUsergroupComponent;
  let fixture: ComponentFixture<DialogCreateUsergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateUsergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
