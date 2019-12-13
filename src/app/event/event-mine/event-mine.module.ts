import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventMinePageRoutingModule } from './event-mine-routing.module';

import { EventMinePage } from './event-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventMinePageRoutingModule
  ],
  declarations: [EventMinePage]
})
export class EventMinePageModule {}
