import { Component, OnInit} from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { Base64 } from '@ionic-native/base64/ngx';

const TOKEN_LOGIN = 'login-key';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profileImage : string;
  username : String;
  phoneNumber : number;
  gameList : String[];
  gameList1 : String;
  gameList2 : String;
  gameList3 : String;

  constructor(private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage,
    private base64: Base64
    ) {
      this.loadData();
     }

  ngOnInit() {
  }

  loadData(){
    this.storage.get(TOKEN_LOGIN).then(userObject => {
      var tempUserObject = JSON.parse(userObject);
      console.log("edit-profile-load-data", tempUserObject);

      this.username = tempUserObject.username;
      this.phoneNumber = tempUserObject.phoneNumber;
      
      if(tempUserObject.profileImage === ""){
        this.profileImage = environment.defaultImageProfile;
      }
      else{
        this.profileImage = "data:image/jpeg;base64,"+tempUserObject.profileImage;
      }

      if(tempUserObject.gameList === null){
        this.gameList = [""];
        this.gameList1 = "";
        this.gameList2 = "";
        this.gameList3 = "";
      }
      else{
        this.gameList = tempUserObject.gameList;
        this.gameList1 = tempUserObject.gameList[0];
        this.gameList2 = tempUserObject.gameList[1];
        this.gameList3 = tempUserObject.gameList[2];
      }
    });
  }

  onSubmitGameList(form:NgForm){
    var stringNotification= "";
    var success = false;
    if(form){
      console.log("edit-profile-form-game", form);
      this.gameList = [form.value.game1, form.value.game2, form.value.game3];
      this.storage.get(TOKEN_LOGIN).then(userObject => {
        var tempUserObject = JSON.parse(userObject);
        console.log("edit-profile-url : ", environment.endPointConstant.addUpdateGameList + tempUserObject.username);
        console.log("edit-profile-form-game-list", this.gameList);
        axios({
          method: 'put',
          url: environment.endPointConstant.addUpdateGameList + tempUserObject.username,
          headers: { "Content-Type": "application/json" },
          data: 
          {
            'gameList' : this.gameList
          }
        })
        .then(res => {
          console.log("edit-profile-response: ", res);
          if(res.data.response.responseCode === "Update Success"){
            stringNotification = res.data.response.message;
          }
          
        })
        .catch(error => {
          console.log("edit-profile-error", error);
        })

      });  
    }
  }


  onSubmitProfileImage(form:NgForm){
    var stringNotification= "";
    var success = false;
    var b64 : string;
    if(form){
      console.log("test-base64-tostring", form.value.img);

      let filePath: string = form.value.img;
      this.base64.encodeFile(filePath).then((base64File: string) => {
        b64 = base64File;
        console.log("COKKKKKKKKKK", b64);
        this.storage.get(TOKEN_LOGIN).then(userObject => {
          var tempUserObject = JSON.parse(userObject);
          console.log("edit-profile-url : ", environment.endPointConstant.addUpdateProfileImage + tempUserObject.username);
          console.log("edit-profile-b64 : ", b64);
          axios({
            method: 'put',
            url: environment.endPointConstant.addUpdateProfileImage + tempUserObject.username,
            headers: { "Content-Type": "application/json" },
            data: 
            {
              'imageInString':  b64
            }
          })
          .then(res => {
            console.log("edit-profile-response: ", res);
            if(res.data.response.responseCode === "Update Success"){
              stringNotification = res.data.response.message;
            }
          })
          .catch(error => {
            console.log("edit-profile-error", error);
          })
  
        });
        
      }, (err) => {
        console.log(err);
      });  
    }
  }

  onSubmitPhoneNumber(form: NgForm){
    var stringNotification = "";
    var success = false;

    if(form){
      console.log("edit-profile-form-phone-number : ", form);
      console.log("phone_number :", form.value.phone_number.toString());

      if(form.value.phone_number.length < 8 && form.value.phone_number.length > 15){
        console.log("invalid");
        stringNotification = "Please input valid phone number!";
      }
      else{
        console.log("valid");
        this.storage.get(TOKEN_LOGIN).then(userObject => {
          var tempUserObject = JSON.parse(userObject);
          // console.log("edit-profile-storage : ", tempUserObject);
          console.log("username : ", tempUserObject.username);
          console.log("phoneNumber : ", form.value.phone_number);
          console.log("url : ", environment.endPointConstant.addUpdatePhoneNumber + tempUserObject.username);

          axios({
            method: 'put',
            url: environment.endPointConstant.addUpdatePhoneNumber + tempUserObject.username,
            headers: { "Content-Type": "application/json" },
            data: 
            {
              'phoneNumber': form.value.phone_number.toString()
            }
          })
          .then(res => {
            console.log("edit-profile-response: ", res);
            stringNotification = res.data.response.message;
          })
          .catch(error => {
            console.log("edit-profile-error", error);
          })
        });
      }
    }
  }
}
