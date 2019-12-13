import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForumAddPage } from './forum-add.page';

describe('ForumAddPage', () => {
  let component: ForumAddPage;
  let fixture: ComponentFixture<ForumAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForumAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
