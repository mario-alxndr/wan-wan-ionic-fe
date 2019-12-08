import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from '../../../environments/environment';
import { Position } from '../position.model';
import axios from 'axios';
import { Event } from '../event.model';

const TOKEN_LOGIN = 'login-key';
const TOKEN_POSITION = 'user-location';

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
  maxPageArr: Number[];
  maxPage: Number;
  searchEmpty: boolean;

  constructor(
    private loginSrvc: LoginService,
    private storage: Storage,
    private router: Router,
    private geolocation: Geolocation,
    public alertController: AlertController
  ) {    
    this.getLocationAndEvents(this.selectedPage);
  }

  public getSearchData(searchFilter){
    var tempResponse = undefined;

    this.searchEmpty = false;
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    if(searchFilter === ""){
      this.getLocationAndEvents(1);
    }
    else{
      this.geolocation.getCurrentPosition()
      .then((response) => {
        this.currLatitude = response.coords.latitude;
        this.currLongitude = response.coords.longitude;
        console.log(this.currLatitude,this.currLongitude);
        if(!this.currLatitude && !this.currLongitude) {
          this.presentAlertGeolocation("Error when receive current location.");
        }
        else {
          this.storage.get(TOKEN_LOGIN).then(userObject => {
            var tempUserObject = JSON.parse(userObject);
            axios({
              method: 'get',
              url: environment.endPointConstant.searchEvent +  tempUserObject.username +'/' + searchFilter.toString() + '/' + this.currLatitude + '/' + this.currLongitude,
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              if(response.data.thread) {
                console.log(response);
                tempResponse = response.data;
              }
            })
            .catch(function (error) {
              console.log(error);
            })
          });
        }
      })
      .catch((error) => {
        this.presentAlertGeolocation("Please Allow Location Access");
        console.log('error getting location', error);
      })
      return new Promise(() => {
        setTimeout(() => {
          if(tempResponse == undefined) {
            this.getLocationAndEvents(1);
          }
          else {
            this.events = tempResponse.eventList;
            this.maxPage = tempResponse.maxPage;
            console.log("cuyy", this.maxPage);
            this.maxPageArr = this.toBeArray(tempResponse.maxPage);
            console.log("coyy", this.maxPageArr);
          }
        }, 2000);
      });
    }
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

        var position = new Position(this.currLatitude, this.currLongitude);

        this.storage.set(TOKEN_POSITION, position).then((response) => {
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
                  this.maxPage = tempResponse.maxPage;
                  console.log("cuyy", this.maxPage);
                  this.maxPageArr = this.toBeArray(tempResponse.maxPage);
                  console.log("coyy", this.maxPageArr);
                }
              }, 2000);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
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

  toBeArray(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

  ngOnInit() {
  }

}
