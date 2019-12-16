import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import axios from 'axios';

const TOKEN_POSITION = 'user-location';
const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-event-mine',
  templateUrl: './event-mine.page.html',
  styleUrls: ['./event-mine.page.scss'],
})

export class EventMinePage implements OnInit {
  private currLatitude;
  private currLongitude;
  myEventList: Promise<Event[]>;
  searchEmpty: boolean;

  constructor(
    private loginSrvc: LoginService,
    private storage: Storage,
    private router: Router
  ) {
  }

  ionViewWillEnter() {
    this.getMyEventData();
  }

  getMyEventData() {
    var tempResponse = undefined;
    var eventMinePage = this;
    this.searchEmpty = false;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.storage.get(TOKEN_POSITION).then(response => {
      this.currLatitude = response._latitude;
      this.currLongitude = response._longitude;
      this.storage.get(TOKEN_USERNAME).then(username => {
        axios({
          method: 'get',
          url: environment.endPointConstant.eventGetMyEventEndPoint + username + "/" + this.currLatitude + '/' + this.currLongitude,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          if(response.data) {
            console.log(response);
            tempResponse = response.data;
          }
          eventMinePage.myEventList = tempResponse.EventList;
          if(eventMinePage.myEventList === null) {
            eventMinePage.searchEmpty = true;
          }
        })
        .catch(error => {
          console.log(error);
        })
      });
    })
  }

  ngOnInit() {

  }
}