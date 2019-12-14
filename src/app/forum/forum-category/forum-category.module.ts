import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumCategoryPageRoutingModule } from './forum-category-routing.module';

import { ForumCategoryPage } from './forum-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumCategoryPageRoutingModule
  ],
  declarations: [ForumCategoryPage]
})
export class ForumCategoryPageModule {}
