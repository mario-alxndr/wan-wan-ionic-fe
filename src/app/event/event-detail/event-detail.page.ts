import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import axios from 'axios';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})

export class EventDetailPage implements OnInit {
  event: Event = new Event();
  private currLatitude;
  private currLongitude;

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    public alertController: AlertController
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
                  console.log(this.event);
                }
              }, 2000);
            });
          }
        })
      })
    }
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
