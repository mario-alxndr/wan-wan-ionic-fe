import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import axios from 'axios';

const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isFormValid = false; 
  logo = "assets/login.png";
  stringLoading = "Please wait. We are checking your login informations."
  
  constructor(
    private router: Router,
    public alertController: AlertController,
    private loginSrvc: LoginService,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    console.log(this.loginSrvc.userIsLoggedIn);
    this.storage.get(TOKEN_USERNAME).then(username => {
      if(username){
        this.router.navigateByUrl('/forum/forum-home');
      }
    })
  }

  validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  async presentAlert(stringNotification) {
    const alertFailed = await this.alertController.create({
      header: 'Error',
      message: stringNotification,
      buttons: ['OK']
    });

    await alertFailed.present();
  }

  async onLogin(form) {
    console.log(new Date);
    var stringNotification = "Please try login again.";
    var counter = 0;
    var loginSuccess = false;
    var tempUsername
    var loginPage = this;

    if(!form.value.email || !form.value.password) {
      stringNotification += " Please enter your ";
      if(!form.value.email){
        stringNotification += "email";
        counter++;
      } 
      if(!form.value.password) {
        if(counter>0){
          stringNotification += " & ";
        }
        stringNotification += "password";
        counter++;
      }
      loginPage.presentAlert(stringNotification);
    }
    else if(!this.validateEmail(form.value.email)) {
      stringNotification = "Please input valid email!";
      loginPage.presentAlert(stringNotification);
    }
    else {
      loginPage.presentLoading(this.stringLoading);
      axios({
        method: 'post',
        url: environment.endPointConstant.loginEndPoint,
        headers: {
          "Content-Type": "application/json"
        },
        data:
        {
          'email': form.value.email,
          'password': form.value.password
        }
      })
      .then(function (response) {
        console.log("login response", response);
        if(response.data.Response.responseCode == "Login Failed"){
          stringNotification = response.data.Response.message;
        }
        else if(response.data.Response.responseCode === "Success Login") {
          loginSuccess = true;
          tempUsername = response.data.username;
        }
        if(loginSuccess){
          loginPage.setUserToStorage(tempUsername);
        } else {
          loginPage.loadingCtrl.dismiss();
          loginPage.presentAlert(stringNotification);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  setUserToStorage(username) {
    var loginPage = this;
    axios({
      method: 'get',
      url: environment.endPointConstant.getUserData + username,
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      loginPage.loadingCtrl.dismiss();
      console.log("get user data response ",res);
      this.loginSrvc.logIn(res.data);
    })
  }

  onRegister() {
    this.router.navigateByUrl('/register');
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
