import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import axios from 'axios';

const TOKEN_POSITION = 'user-location';
const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.page.html',
  styleUrls: ['./my-event.page.scss'],
})
export class MyEventPage implements OnInit {
  private currLatitude;
  private currLongitude;
  myEventList: Promise<Event[]>;
  searchEmpty: boolean;

  constructor(
    private loginSrvc: LoginService,
    private storage: Storage,
    private router: Router
  ) {
    this.getMyEventData();
  }

  getMyEventData() {
    var tempResponse = undefined;
    this.searchEmpty = false;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.storage.get(TOKEN_POSITION).then(response => {
      this.currLatitude = response._latitude;
      this.currLongitude = response._longitude;
      
      console.log(this.currLatitude, this.currLongitude);

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
        })
        .catch(error => {
          console.log(error);
        })
      });
      return new Promise(() => {
        setTimeout(() => {
          this.myEventList = tempResponse.EventList;

          if(this.myEventList === null) {
            this.searchEmpty = true;
          }
        }, 5000);
      })
    })
  }

  ngOnInit() {
  }
}
