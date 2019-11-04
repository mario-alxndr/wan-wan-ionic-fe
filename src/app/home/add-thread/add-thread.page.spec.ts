import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThreadPage } from './add-thread.page';

describe('AddThreadPage', () => {
  let component: AddThreadPage;
  let fixture: ComponentFixture<AddThreadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddThreadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
