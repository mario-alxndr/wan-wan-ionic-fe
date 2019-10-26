import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'home',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'add-thread',
                loadChildren: './add-thread/add-thread.module#AddThreadPageModule'
            },
            {
                path: 'thread-category',
                loadChildren: './thread-category/thread-category.module#ThreadCategoryPageModule'
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}
