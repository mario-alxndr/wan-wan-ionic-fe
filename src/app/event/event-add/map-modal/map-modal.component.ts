import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  //currLatitude = 51.678418;
  //currLongitude = 7.809007;
  currLatitude;
  currLongitude;
  @ViewChild('map', { static: false}) mapElementRef: ElementRef;

  constructor(
    private modalController: ModalController,
    private geolocation: Geolocation,
    private renderer: Renderer2
  ) {
    //this.getCurrentLocation();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.geolocation.getCurrentPosition().then((response) => {
      this.currLatitude = response.coords.latitude;
      this.currLongitude = response.coords.longitude;
      console.log(this.currLatitude, this.currLongitude);
      this.getGoogleMaps().then((googleMaps) => {
        const mapElement = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapElement, {
          center: { lat: this.currLatitude, lng: this.currLongitude},
          zoom: 16,
        });
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapElement, 'visible');
        });
        const marker = new googleMaps.Marker({ position: { lat: this.currLatitude, lng: this.currLongitude}, map});
        console.log(marker);
        map.addListener('click', event => {
          const selectedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          this.modalController.dismiss(selectedCoords);
        });
      }).catch(error => {
        console.log(error);
      })
    });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if(googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `http://maps.googleapis.com/maps/api/js?key=${environment.mapsAPIKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK is not available');
        }
      };
    });
  }

  // getCurrentLocation() {
    
  // }

  onChooseLocation(event: any) {
    this.currLatitude = event.coords.lat;
    this.currLongitude = event.coords.lng;
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
