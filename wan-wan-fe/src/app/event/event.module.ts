import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
import { EventRoutingModule } from './event-routing.modules'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventRoutingModule,
  ],
  declarations: [EventPage]
})
export class EventPageModule {}
