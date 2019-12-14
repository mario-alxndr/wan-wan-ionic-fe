import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForumDetailPage } from './forum-detail.page';

describe('ForumDetailPage', () => {
  let component: ForumDetailPage;
  let fixture: ComponentFixture<ForumDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForumDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
