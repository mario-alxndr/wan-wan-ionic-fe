import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { LoginService } from './../login/login.service';

const TOKEN_LOGIN = 'login-key';

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

  getProfile(){
    this.storage.get(TOKEN_LOGIN).then(userObject => {
      var tempUserObject = JSON.parse(userObject);
      console.log("profile-storage : ", tempUserObject);

      this.username = tempUserObject.username;
      this.phoneNumber = tempUserObject.phoneNumber;
      
      if(tempUserObject.profileImage === ""){
        this.profileImage = environment.defaultImageProfile;
      }
      else{
        this.profileImage = "data:image/jpeg;base64,"+tempUserObject.profileImage;
      }
      if(tempUserObject.gameList === null){
        this.gameList = ["No game added yet"];
      }
      else{
        this.gameList = tempUserObject.gameList;
      }

      console.log("game-list : ", this.gameList[0]);
    });
  }

  ngOnInit() {
  }
}
