import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from '../../../environments/environment';
import axios from 'axios';

import { Event } from '../event.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  events: Promise<Event[]>;
  private currLatitude;
  private currLongitude;
  private selectedPage = 1;

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
    private geolocation: Geolocation,
    public alertController: AlertController
  ) {
    this.getLocationAndEvents(this.selectedPage);
  }

  getLocationAndEvents(selectedPage) {
    var tempResponse = undefined;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
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
            url: environment.endPointConstant.eventPageEndPoint + "?page=" + selectedPage + "&latitude=" + this.currLatitude + '&longitude=' + this.currLongitude,
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            if(response.data) {
              console.log(response);
              tempResponse = response.data;
            }
          })
          .catch(error => {
            console.log(error);
          })

          return new Promise(() => {
            setTimeout(() => {
              if(tempResponse == undefined) {
                this.getLocationAndEvents(selectedPage);
              }
              else {
                this.events = tempResponse.eventList;
              }
            }, 2000);
          });
        }
      })
      .catch((error) => {
        this.presentAlertGeolocation("Please Allow Location Access");
        console.log('error getting location', error);
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

  changePage(selectedPage) {
    this.selectedPage = selectedPage;
    this.getLocationAndEvents(selectedPage);
  }

  ngOnInit() {
  }

}
