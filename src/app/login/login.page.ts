import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import axios from 'axios';
import { loadingController } from '@ionic/core';

const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isFormValid = false; 
  logo = "assets/login.png";

  constructor(
    private router: Router,
    public alertController: AlertController,
    private loginSrvc: LoginService,
    private storage: Storage,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    // console.log(this.loginSrvc.userIsLoggedIn);
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


    const loading = await this.loadingController.create({
      duration : 10000000
    });
    await loading.present(); 

    if(!form.value.email || !form.value.password) {
      loading.dismiss();
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
      loading.dismiss();
      stringNotification = "Please input valid email!";
      loginPage.presentAlert(stringNotification);
    }
    else {
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
          loading.dismiss();
        } else {
          loading.dismiss();
          loginPage.presentAlert(stringNotification);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  setUserToStorage(username) {
    axios({
      method: 'get',
      url: environment.endPointConstant.getUserData + username,
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log("get user data response ",res);
      this.loginSrvc.logIn(res.data);
    })
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  } 
}
