import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventMinePage } from './event-mine.page';

const routes: Routes = [
  {
    path: '',
    component: EventMinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventMinePageRoutingModule {}
