import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { LoginService } from './../login/login.service';
import axios from 'axios';

const TOKEN_LOGIN = 'login-key';
const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username : String;
  phoneNumber : String;
  gameList;
  profileImage;
  
  constructor(private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage) {
    this.getProfile();
  }
  
  ionViewWillEnter() {
    this.getProfile();
  }

  getProfile(){
    this.phoneNumber = "";
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.storage.get(TOKEN_USERNAME).then(username => {
      var tempResponse;
      console.log(username);
      axios({
        method: 'get',
        url: environment.endPointConstant.getUserData + username,
        headers: { "Content-type": "application/json" }
      })
      .then(response => {
        console.log(response);
        tempResponse = response.data;
      })
      .catch(error => {
        console.log(error);
      })
      return new Promise(() => {
        setTimeout(() => {
          this.username = username;
          this.phoneNumber = tempResponse.phoneNumber;
          
          if(tempResponse.profileImage === ""){
            this.profileImage = environment.defaultImageProfile;
          }
          else{
            this.profileImage = tempResponse.profileImage;
          }
          if(tempResponse.gameList === null){
            this.gameList = ["No game added yet"];
          }
          else{
            this.gameList = tempResponse.gameList;
          }
          this.storage.set(TOKEN_LOGIN, JSON.stringify(tempResponse)).then((response) => {});
        }, 2000);
      });
    });
  }

  ngOnInit() {

  }
}
