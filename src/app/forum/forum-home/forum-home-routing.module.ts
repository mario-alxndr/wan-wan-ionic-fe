import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumHomePage } from './forum-home.page';

const routes: Routes = [
  {
    path: '',
    component: ForumHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumHomePageRoutingModule {}
