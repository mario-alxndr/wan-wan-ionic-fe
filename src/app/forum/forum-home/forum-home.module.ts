import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumHomePageRoutingModule } from './forum-home-routing.module';

import { ForumHomePage } from './forum-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumHomePageRoutingModule
  ],
  declarations: [ForumHomePage]
})
export class ForumHomePageModule {}
