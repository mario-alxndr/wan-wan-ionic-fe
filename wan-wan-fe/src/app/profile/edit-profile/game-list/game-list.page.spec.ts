import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListPage } from './game-list.page';

describe('GameListPage', () => {
  let component: GameListPage;
  let fixture: ComponentFixture<GameListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
