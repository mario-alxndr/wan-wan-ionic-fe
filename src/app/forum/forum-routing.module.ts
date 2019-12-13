import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumPage } from './forum.page';

const routes: Routes = [
  {
    path: '',
    component: ForumPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./forum-home/forum-home.module').then( m => m.ForumHomePageModule)
      },
      {
        path: 'forum-home',
        loadChildren: () => import('./forum-home/forum-home.module').then( m => m.ForumHomePageModule)
      },
      {
        path: 'forum-category',
        loadChildren: () => import('./forum-category/forum-category.module').then( m => m.ForumCategoryPageModule)
      },
      {
        path: 'forum-add',
        loadChildren: () => import('./forum-add/forum-add.module').then( m => m.ForumAddPageModule)
      },
      {
        path: 'forum-detail',
        loadChildren: () => import('./forum-detail/forum-detail.module').then( m => m.ForumDetailPageModule)
      }
    ]
  },
  {
    path: 'forum',
    redirectTo: '/forum/forum-home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumPageRoutingModule {}
