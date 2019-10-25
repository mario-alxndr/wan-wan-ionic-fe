import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPage } from './event.page';

const routes: Routes = [
    {
        path: '',
        component: EventPage,
        children: [
            {
                path: 'event',
                redirectTo: '/event',
                pathMatch: 'full'
            },
            {
                path: 'add-event',
                loadChildren: './add-event/add-event.module#AddEventPageModule'
            },
            {
                path: 'my-event',
                loadChildren: './my-event/my-event.module#MyEventPageModule'
            },
            {
                path: '',
                redirectTo: '/event',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/event',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EventRoutingModule {}