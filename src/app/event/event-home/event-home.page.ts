import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
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
  stringLoading = "Please wait. We are loading the Event Home contents."
  empty;

  constructor(
    private loginSrvc: LoginService,
    private storage: Storage,
    private router: Router,
    private geolocation: Geolocation,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) { 
    this.empty = environment.defaultEmptyImage;
  }

  ionViewWillEnter() {
    this.selectedPage = 1;
    this.getLocationAndEvents(1);
  }

  public getSearchData(searchFilter){
    var tempResponse = undefined;
    this.searchEmpty = false;
    var eventHomePage = this;

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
            this.stringLoading = "We are searching the events."
            this.presentLoading(this.stringLoading)
            axios({
              method: 'get',
              url: environment.endPointConstant.searchEvent + '/' + tempUserObject.username + '/' + searchFilter.toString() + '/' + this.selectedPage + '/' + this.currLatitude + '/' + this.currLongitude,
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              tempResponse = response.data;
              if(tempResponse == "No Event with this name available") {
                eventHomePage.searchEmpty = true;
                eventHomePage.maxPage = 0;
                eventHomePage.maxPageArr = [1];
                eventHomePage.events = null;
              }
              else {
                for(let i = 0; i < tempResponse.eventList.length; i++){
                  if(tempResponse.eventList[i].makerImage === ""){
                    tempResponse.eventList[i].makerImage = environment.defaultImageProfile;
                  }
                }
                eventHomePage.events = tempResponse.eventList;
                eventHomePage.maxPage = tempResponse.maxPage;
                eventHomePage.maxPageArr = eventHomePage.toBeArray(tempResponse.maxPage);
              }
              eventHomePage.loadingCtrl.dismiss();
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
    }
  }

  getLocationAndEvents(selectedPage) {
    var tempResponse = undefined;
    var eventHomePage = this;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.presentLoading(this.stringLoading);
      this.geolocation.getCurrentPosition()
      .then((response) => {
        this.currLatitude = response.coords.latitude;
        this.currLongitude = response.coords.longitude;

        var position = new Position(this.currLatitude, this.currLongitude);
        console.log(position);
        this.storage.set(TOKEN_POSITION, position).then((response) => {
          if(!this.currLatitude && !this.currLongitude) {
            this.presentAlertGeolocation("Error when receive current location.");
            eventHomePage.loadingCtrl.dismiss();
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
                  for(let i = 0; i < response.data.eventList.length; i++){
                    if(response.data.eventList[i].makerImage === ""){
                      response.data.eventList[i].makerImage = environment.defaultImageProfile;
                    }
                  }
                  tempResponse = response.data;
                }
                if(tempResponse == undefined) {
                  location.reload();
                }
                else {
                  eventHomePage.events = tempResponse.eventList;
                  eventHomePage.maxPage = tempResponse.maxPage;
                  eventHomePage.maxPageArr = eventHomePage.toBeArray(tempResponse.maxPage);
                }
                eventHomePage.loadingCtrl.dismiss();
              })
              .catch(error => {
                console.log(error);
              })
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