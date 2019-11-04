import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'add-thread',
                loadChildren: './add-thread/add-thread.module#AddThreadPageModule'
            },
            {
                path: 'thread-category',
                loadChildren: './thread-category/thread-category.module#ThreadCategoryPageModule'
            },
            {
                path: 'main',
                loadChildren: './main-forum/main-forum.module#MainForumPageModule'
            },
            {
                path: ':threadId',
                loadChildren: './thread-detail/thread-detail.module#ThreadDetailPageModule'
            },
            {
                path: '',
                redirectTo: '/home/main',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/main-forum',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}
