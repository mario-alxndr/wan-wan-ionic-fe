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
  constructor(private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage) {
      this.editPhoneNumber()
     }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
  
  editPhoneNumber(){
    this.storage.get(TOKEN_LOGIN).then(userObject => {
      var tempUserObject = JSON.parse(userObject);
      console.log("cookkk", tempUserObject);

      this.username = tempUserObject.username;
      this.phoneNumber = tempUserObject.phoneNumber;

      if(this.profileImage === ""){
        this.profileImage = environment.defaultImageProfile;
      }
      else{
        this.profileImage = "data:image/jpeg;base64,"+tempUserObject.profileImage;
      }

      axios({
        method: 'put',
        url: environment.endPointConstant.addUpdatePhoneNumber + tempUserObject.username,
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        
      })

    });
  }
  

}
