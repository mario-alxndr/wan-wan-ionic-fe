import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
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
  stringLoading = "Please wait. We are loading the Event information."

  constructor(
    private loginSrvc: LoginService,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    public alertController: AlertController,
    public toastController: ToastController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
  ) {
    this.getLocDetailEvent();
  }

  getLocDetailEvent() {
    var tempResponse = undefined;
    var eventDetailPage = this;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.stringLoading = "Please wait. We are loading the Event information."
      this.presentLoading(this.stringLoading)
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
                if(tempResponse == undefined) {
                  eventDetailPage.loadingCtrl.dismiss();
                  location.reload();
                }
                else {
                  eventDetailPage.event = tempResponse.data.event;
                  eventDetailPage.bookmark = tempResponse.data.event.bookmarkStatus; 
                  console.log("bookmark", eventDetailPage.bookmark);
                  eventDetailPage.event.dateStart = moment(eventDetailPage.event.dateStart).format("MMM Do YY");
                  eventDetailPage.event.dateEnd = moment(eventDetailPage.event.dateEnd).format("MMM Do YY");
                  eventDetailPage.event.timestamp = moment(eventDetailPage.event.timestamp).format("MMM Do YY")
                  eventDetailPage.locationAddress = eventDetailPage.getAddress(eventDetailPage.event.latitude, eventDetailPage.event.longitude);
                  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${eventDetailPage.event.latitude},${eventDetailPage.event.longitude}&key=${environment.mapsAPIKey}`).then((response) => {
                    console.log(response);
                    eventDetailPage.locationAddress = response.data.results[0].formatted_address;
                  });
                  eventDetailPage.loadingCtrl.dismiss();
                }
              })
              .catch(error => {
                console.log(error);
              })
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
            this.router.navigateByUrl('forum/forum-main');
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
    var eventDetailPage = this;
    console.log(this.userId);
    this.storage.get(TOKEN_USERNAME).then(username => {
      this.stringLoading = "Please wait. We are saving this event for you."
      var endPointExt = "add";
      if(this.bookmark === "true") {
        endPointExt = "remove";
        this.stringLoading = "Please wait. We are removing this event for you."
      }
      console.log(endPointExt);
      this.presentLoading(this.stringLoading);
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
        eventDetailPage.loadingCtrl.dismiss();
        this.presentToast();
        this.getLocDetailEvent();
      });
    });
  }

  ngOnInit() {

  }

  presentLoading(stringLoading){
    console.log("mulai present")
    this.loadingCtrl.create({
      keyboardClose: true,
      message: stringLoading
    })
    .then(loadingEl => {
      loadingEl.present();
    })
    console.log("selesai present")
  }
}
