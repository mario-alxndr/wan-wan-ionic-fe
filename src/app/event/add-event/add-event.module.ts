import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MapModalComponent } from './map-modal/map-modal.component';
import { IonicModule } from '@ionic/angular';
import { AddEventPage } from './add-event.page';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: AddEventPage
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
    AddEventPage,
    MapModalComponent
  ],
  entryComponents: [
    MapModalComponent
  ],
  exports: [ MapModalComponent ]
})

export class AddEventPageModule {}
