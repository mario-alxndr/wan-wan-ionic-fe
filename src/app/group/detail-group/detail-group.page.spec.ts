import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGroupPage } from './detail-group.page';

describe('DetailGroupPage', () => {
  let component: DetailGroupPage;
  let fixture: ComponentFixture<DetailGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
