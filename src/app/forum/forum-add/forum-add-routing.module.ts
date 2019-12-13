import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumAddPage } from './forum-add.page';

const routes: Routes = [
  {
    path: '',
    component: ForumAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumAddPageRoutingModule {}
