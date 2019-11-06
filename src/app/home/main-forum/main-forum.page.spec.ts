import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainForumPage } from './main-forum.page';

describe('MainForumPage', () => {
  let component: MainForumPage;
  let fixture: ComponentFixture<MainForumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainForumPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainForumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
