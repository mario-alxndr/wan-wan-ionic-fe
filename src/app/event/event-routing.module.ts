import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPage } from './event.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./event-home/event-home.module').then( m => m.EventHomePageModule)
      },
      {
        path: 'event-home',
        loadChildren: () => import('./event-home/event-home.module').then( m => m.EventHomePageModule)
      },
      {
        path: 'event-add',
        loadChildren: () => import('./event-add/event-add.module').then( m => m.EventAddPageModule)
      },
      {
        path: 'event-mine',
        loadChildren: () => import('./event-mine/event-mine.module').then( m => m.EventMinePageModule)
      },
      {
        path: 'event-detail/:eventId',
        loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/event/event-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
