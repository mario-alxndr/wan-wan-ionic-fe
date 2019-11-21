import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

const TOKEN_LOGIN = 'login-key';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profileImage;
  username : String;
  phoneNumber : String;
  gameList;

  constructor(private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage) {
      this.loadData();
     }

  ngOnInit() {
  }

  loadData(){
    this.storage.get(TOKEN_LOGIN).then(userObject => {
      var tempUserObject = JSON.parse(userObject);
      console.log("cookkk", tempUserObject);

      this.username = tempUserObject.username;
      this.phoneNumber = tempUserObject.phoneNumber;
      
      if(tempUserObject.profileImage === ""){
        this.profileImage = environment.defaultImageProfile;
      }
      else{
        this.profileImage = "data:image/jpeg;base64,"+tempUserObject.profileImage;
      }

      this.gameList = tempUserObject.gameList;

    });
  }
  onSubmitPhoneNumber(form: NgForm){
    var stringNotification = "";
    var success = false;

    if(form){
      console.log("edit-profile-form : ", form);
      if(form.value.phone_number.length < 8 && form.value.phone_number.length > 15){
        console.log("invalid");
        stringNotification = "Please input valid phone number!";
      }
      else{
        console.log("valid");
        this.storage.get(TOKEN_LOGIN).then(userObject => {
          var tempUserObject = JSON.parse(userObject);
          console.log("edit-profile-storage : ", tempUserObject);
          console.log("username : ", tempUserObject.username);
          console.log("phoneNumber : ", form.value.phone_number);
          axios({
            method: 'put',
            url: environment.endPointConstant.addUpdatePhoneNumber + tempUserObject.username,
            headers: { "Content-Type": "application/json" },
            data: 
            {
              'username': tempUserObject.username,
              'phoneNumber': form.value.phone_number
            }
          })
          .then(res => {
            console.log("edit-profile-response: ", res);
            if(res.data.response.responseCode === "Update Success"){
              stringNotification = res.data.response.message;
            }
          })
          .catch(error => {
            console.log(error);
          })
        });
      }
    }
  }
}
