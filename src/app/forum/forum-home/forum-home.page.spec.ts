import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForumHomePage } from './forum-home.page';

describe('ForumHomePage', () => {
  let component: ForumHomePage;
  let fixture: ComponentFixture<ForumHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForumHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
