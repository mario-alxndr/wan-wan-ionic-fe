import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPage } from './event.page';

const routes: Routes = [
    {
        path: '',
        component: EventPage,
        children: [
            {
                path: 'add-event',
                loadChildren: './add-event/add-event.module#AddEventPageModule'
            },
            {
                path: 'my-event',
                loadChildren: './my-event/my-event.module#MyEventPageModule'
            },
            {
                path: 'main',
                loadChildren: './main/main.module#MainPageModule'
            },
            {
                path: ':eventId',
                loadChildren: './event-detail/event-detail.module#EventDetailPageModule'
            },
            {
                path: '',
                redirectTo: '/event/main',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/event/main',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EventRoutingModule {}