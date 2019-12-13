import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumDetailPageRoutingModule } from './forum-detail-routing.module';

import { ForumDetailPage } from './forum-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumDetailPageRoutingModule
  ],
  declarations: [ForumDetailPage]
})
export class ForumDetailPageModule {}
