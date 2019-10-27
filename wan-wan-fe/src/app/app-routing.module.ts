import { NgModule } from '@angular/core';
import {PreloadAllModules, PreloadingStrategy, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'thread-detail', loadChildren: './home/thread-detail/thread-detail.module#ThreadDetailPageModule' },
  { path: 'thread-category', loadChildren: './home/thread-category/thread-category.module#ThreadCategoryPageModule' },
  { path: 'add-thread', loadChildren: './home/add-thread/add-thread.module#AddThreadPageModule' },
  { path: 'event', loadChildren: './event/event.module#EventPageModule' },
  { path: 'add-event', loadChildren: './event/add-event/add-event.module#AddEventPageModule' },
  { path: 'my-event', loadChildren: './event/my-event/my-event.module#MyEventPageModule' },
  { path: 'event-detail', loadChildren: './event/event-detail/event-detail.module#EventDetailPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'edit-profile', loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'game-list', loadChildren: './profile/edit-profile/game-list/game-list.module#GameListPageModule' },
  { path: 'main', loadChildren: './home/main/main.module#MainPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules
      , enableTracing: true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
