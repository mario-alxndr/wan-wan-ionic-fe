import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import { Event } from '../event.model';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { present } from '@ionic/core/dist/types/utils/overlays';

const TOKEN_USERNAME = 'username-key';
const TOKEN_ID = 'userid-key';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})

export class EventDetailPage implements OnInit {
  event: Event = new Event();
  private currLatitude;
  private currLongitude;
  private eventId;
  private userId;
  private locationAddress;
  private bookmark : String;

  constructor(
    private loginSrvc: LoginService,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    public alertController: AlertController,
    public toastController: ToastController,
    private http: HttpClient
  ) {
    this.getLocDetailEvent();
  }

  getLocDetailEvent() {
    var tempResponse = undefined;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.storage.get(TOKEN_ID).then(userId => {
        this.userId = userId;
        this.route.paramMap.subscribe(paramMap => {
          this.eventId = paramMap.get('eventId');
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
                url: environment.endPointConstant.eventDetailEndPoint + '?eventId=' + this.eventId + "&userLatitude=" + this.currLatitude + '&userLongitude=' + this.currLongitude + '&userId=' + this.userId,
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
                    this.bookmark = tempResponse.data.event.bookmarkStatus; 
                    console.log("bookmark", this.bookmark);
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
      });
    }
  }

  private getAddress(lat, lng){
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.mapsAPIKey}`)
    .pipe(
      map(geoData => {
        if(!geoData || !geoData.results || !geoData.results.length) {
          return null;
        }
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

  async presentToast() {
    var toastString = "added";
    if(this.bookmark === "true") {
      toastString = "removed" 
    }
    const toast = await this.toastController.create({
      message: 'Event has been ' + toastString,
      duration: 1000
    });
    toast.present();
  }

  onSaveOrRemoveEvent() {
    this.storage.get(TOKEN_USERNAME).then(username => {
      var endPointExt = "add";
      if(this.bookmark === "true") {
        endPointExt = "remove";
      }
      console.log(endPointExt);
      axios({
        method: 'put',
        url: environment.endPointConstant.saveorremoveMyEvent + endPointExt,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          'userId': this.userId,
          'eventId': this.eventId,
        }
      }).then(response => {
        console.log(response);
        this.presentToast();
        this.getLocDetailEvent();
      });
    });
  }

  ngOnInit() {

  }

}
