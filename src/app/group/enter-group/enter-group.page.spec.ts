import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterGroupPage } from './enter-group.page';

describe('EnterGroupPage', () => {
  let component: EnterGroupPage;
  let fixture: ComponentFixture<EnterGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
