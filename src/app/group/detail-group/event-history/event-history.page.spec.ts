import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHistoryPage } from './event-history.page';

describe('EventHistoryPage', () => {
  let component: EventHistoryPage;
  let fixture: ComponentFixture<EventHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
