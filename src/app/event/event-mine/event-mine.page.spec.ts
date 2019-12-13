import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventMinePage } from './event-mine.page';

describe('EventMinePage', () => {
  let component: EventMinePage;
  let fixture: ComponentFixture<EventMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
