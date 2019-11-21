import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import { Event } from '../event.model';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})

export class EventDetailPage implements OnInit {
  event: Event = new Event();
  private currLatitude;
  private currLongitude;
  private locationAddress;

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    public alertController: AlertController,
    private http: HttpClient
  ) {
    this.getLocDetailEvent();
  }

  getLocDetailEvent() {
    var tempResponse = undefined;
    var eventId;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.route.paramMap.subscribe(paramMap => {
        eventId = paramMap.params.eventId;
        this.geolocation.getCurrentPosition()
        .then((response) => {
          this.currLatitude = response.coords.latitude;
          this.currLongitude = response.coords.longitude;
          console.log(this.currLatitude,this.currLongitude);
          if(!this.currLatitude && !this.currLongitude) {
            this.presentAlertGeolocation("Error when receive current location.");
          }
          else {
            axios({
              method: 'get',
              url: environment.endPointConstant.eventDetailEndPoint + '?eventId=' + eventId + "&userLatitude=" + this.currLatitude + '&userLongitude=' + this.currLongitude,
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              console.log(response);
              tempResponse = response;
            })
            .catch(error => {
              console.log(error);
            })

            return new Promise(() => {
              setTimeout(() => {
                if(tempResponse == undefined) {
                  this.getLocDetailEvent();
                }
                else {
                  this.event = tempResponse.data.event;
                  this.event.dateStart = moment(this.event.dateStart).format("MMM Do YY");
                  this.event.dateEnd = moment(this.event.dateEnd).format("MMM Do YY");
                  this.event.timestamp = moment(this.event.timestamp).startOf('day').fromNow();
                  this.locationAddress = this.getAddress(this.event.latitude, this.event.longitude);
                  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.event.latitude},${this.event.longitude}&key=${environment.mapsAPIKey}`).then((response) => {
                    console.log(response);
                    this.locationAddress = response.data.results[0].formatted_address;
                  });
                  // this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.event.latitude},${this.event.longitude}&key=${environment.mapsAPIKey}`).pipe(
                  //   map(geoData => {
                  //     console.log("coyyyy", geoData.results);
                  //     if(!geoData || !geoData.results || !geoData.results.length) {
                  //       return null;
                  //     }
                  //     return geoData.results[0].formatted_address;
                  //   })
                  // )
                  //console.log(this.event);
                }
              }, 2000);
            });
          }
        })
      })
    }
  }

  private getAddress(lat, lng){
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.mapsAPIKey}`)
    .pipe(
      map(geoData => {
        if(!geoData || !geoData.results || !geoData.results.length) {
          return null;
        }
        console.log("coyyyy", geoData.results);
        return geoData.results[0].formatted_address;
      })
    )
  }

  async presentAlertGeolocation(message) {
    const alertFailed = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: [ 
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('home/main');
          }
        }
      ]
    });
    await alertFailed.present();
  }

  ngOnInit() {
  }

}
