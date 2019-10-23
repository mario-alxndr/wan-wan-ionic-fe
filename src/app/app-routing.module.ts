import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'add-thread', loadChildren: './home/add-thread/add-thread.module#AddThreadPageModule' },
  { path: 'thread-category', loadChildren: './home/thread-category/thread-category.module#ThreadCategoryPageModule' },
  { path: 'thread-detail', loadChildren: './home/thread-detail/thread-detail.module#ThreadDetailPageModule' },
  
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },

  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },

  { path: 'group', loadChildren: './group/group.module#GroupPageModule' },
  { path: 'create-group', loadChildren: './group/create-group/create-group.module#CreateGroupPageModule' },
  { path: 'enter-group', loadChildren: './group/enter-group/enter-group.module#EnterGroupPageModule' },
  { path: 'detail-group', loadChildren: './group/detail-group/detail-group.module#DetailGroupPageModule' },
  { path: 'group-info', loadChildren: './group/detail-group/group-info/group-info.module#GroupInfoPageModule' },
  { path: 'current-event', loadChildren: './group/detail-group/current-event/current-event.module#CurrentEventPageModule' },
  { path: 'event-history', loadChildren: './group/detail-group/event-history/event-history.module#EventHistoryPageModule' },
  { path: 'add-event', loadChildren: './group/detail-group/add-event/add-event.module#AddEventPageModule' },

  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'edit-profile', loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'game-list', loadChildren: './profile/edit-profile/game-list/game-list.module#GameListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
