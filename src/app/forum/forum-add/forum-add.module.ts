import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumAddPageRoutingModule } from './forum-add-routing.module';

import { ForumAddPage } from './forum-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumAddPageRoutingModule
  ],
  declarations: [ForumAddPage]
})
export class ForumAddPageModule {}
