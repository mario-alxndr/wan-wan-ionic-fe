import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { LoginService } from './../login/login.service';
import axios from 'axios';
import { LoadingController } from '@ionic/angular';

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
  stringLoading = "Please wait. We are loading your profile."
  
  constructor(private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage,
    private loadingCtrl: LoadingController
    ) {
    this.getProfile();
  }
  
  ionViewWillEnter() {
    this.getProfile();
  }

  getProfile(){
    var profilePage = this;

    this.phoneNumber = "";
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.storage.get(TOKEN_USERNAME).then(username => {
      var tempResponse;
      console.log(username);
      this.presentLoading(this.stringLoading);
      axios({
        method: 'get',
        url: environment.endPointConstant.getUserData + username,
        headers: { "Content-type": "application/json" }
      })
      .then(response => {
        console.log(response);
        tempResponse = response.data;
        profilePage.username = username;
        profilePage.phoneNumber = tempResponse.phoneNumber;
          
          if(tempResponse.profileImage === ""){
            profilePage.profileImage = environment.defaultImageProfile;
          }
          else{
            profilePage.profileImage = tempResponse.profileImage;
          }
          if(tempResponse.gameList === null){
            profilePage.gameList = ["No game added yet"];
          }
          else{
            profilePage.gameList = tempResponse.gameList;
          }
          profilePage.storage.set(TOKEN_LOGIN, JSON.stringify(tempResponse)).then((response) => {});
        profilePage.loadingCtrl.dismiss();
      })
      .catch(error => {
        console.log(error);
      })
    });
  }

  ngOnInit() { }

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
