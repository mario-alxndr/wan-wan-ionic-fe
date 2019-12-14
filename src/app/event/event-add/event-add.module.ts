import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MapModalComponent } from './map-modal/map-modal.component';
import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { EventAddPage } from './event-add.page';

const routes: Routes = [
  {
    path: '',
    component: EventAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: `${environment.mapsAPIKey}`
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [
    EventAddPage,
    MapModalComponent
  ],
  entryComponents: [
    MapModalComponent
  ],
  exports: [ MapModalComponent ]
})

export class EventAddPageModule {}
