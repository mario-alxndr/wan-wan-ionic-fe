import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumCategoryPage } from './forum-category.page';

const routes: Routes = [
  {
    path: '',
    component: ForumCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumCategoryPageRoutingModule {}
