import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventPage } from './current-event.page';

describe('CurrentEventPage', () => {
  let component: CurrentEventPage;
  let fixture: ComponentFixture<CurrentEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
