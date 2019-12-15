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
import { runInThisContext } from 'vm';

const TOKEN_LOGIN = 'login-key';
const TOKEN_POSITION = 'user-location';
const TOKEN_ID = 'userid-key';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.page.html',
  styleUrls: ['./event-home.page.scss'],
})
export class EventHomePage implements OnInit {
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
  ) { }

  ionViewWillEnter() {
    this.getLocationAndEvents(this.selectedPage);
  }

  public getSearchData(searchFilter){
    var tempResponse = undefined;
    this.searchEmpty = false;

    if(searchFilter === ""){
      this.getLocationAndEvents(1);
    }
    else{
      this.geolocation.getCurrentPosition().then((response) => {
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
              url: environment.endPointConstant.searchEvent + '/' + tempUserObject.username + '/' + searchFilter.toString() + '/' + this.selectedPage + '/' + this.currLatitude + '/' + this.currLongitude,
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              tempResponse = response.data;
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
          if(tempResponse == "No Event with this name available") {
            this.searchEmpty = true;
            this.maxPage = 0;
            this.maxPageArr = [1];
            this.events = null;
          }
          else {
            this.events = tempResponse.eventList;
            this.maxPage = tempResponse.maxPage;
            this.maxPageArr = this.toBeArray(tempResponse.maxPage);
          }
        }, 5000);
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
        console.log(position);
        this.storage.set(TOKEN_POSITION, position).then((response) => {
          if(!this.currLatitude && !this.currLongitude) {
            this.presentAlertGeolocation("Error when receive current location.");
          }
          else {
            this.storage.get(TOKEN_ID).then(userId => {
              axios({
                method: 'get',
                url: environment.endPointConstant.eventPageEndPoint + "?page=" + selectedPage + "&latitude=" + this.currLatitude + '&longitude=' + this.currLongitude + '&userId=' + userId,
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
                    location.reload();
                  }
                  else {
                    this.events = tempResponse.eventList;
                    this.maxPage = tempResponse.maxPage;
                    this.maxPageArr = this.toBeArray(tempResponse.maxPage);
                  }
                }, 7000);
              });
            })
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