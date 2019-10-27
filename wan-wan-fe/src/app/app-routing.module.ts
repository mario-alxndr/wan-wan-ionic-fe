import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes} from '@angular/router';
import {HomeRoutingModule} from "./home/home-routing.modules";
import {EventRoutingModule} from "./event/event-routing.modules";
// import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    // canLoad: [LoginGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'thread-detail',
    loadChildren: './home/thread-detail/thread-detail.module#ThreadDetailPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'thread-category',
    loadChildren: './home/thread-category/thread-category.module#ThreadCategoryPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'add-thread',
    loadChildren: './home/add-thread/add-thread.module#AddThreadPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'event',
    loadChildren: './event/event.module#EventPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'add-event',
    loadChildren: './event/add-event/add-event.module#AddEventPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'my-event',
    loadChildren: './event/my-event/my-event.module#MyEventPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'event-detail',
    loadChildren: './event/event-detail/event-detail.module#EventDetailPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'edit-profile',
    loadChildren: './profile/edit-profile/edit-profile.module#EditProfilePageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'game-list',
    loadChildren: './profile/edit-profile/game-list/game-list.module#GameListPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'main',
    loadChildren: './home/main/main.module#MainPageModule'
    // canLoad: [LoginGuard]
  },
  { 
    path: 'main-forum',
    loadChildren: './home/main-forum/main-forum.module#MainForumPageModule'
    // canLoad: [LoginGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules
      , enableTracing: true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
