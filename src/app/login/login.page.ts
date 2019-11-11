import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isFormValid = false; 
  
  constructor(
    private router: Router,
    public alertController: AlertController,
    private loginSrvc: LoginService,
  ) { }

  ngOnInit() {}

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

  onLogin(form) {
    var stringNotification = "";
    var counter = 0;
    var loginSuccess = false;

    if(!form.value.email || !form.value.password) {
      stringNotification += "Please enter your ";
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
    }
    else if(!this.validateEmail(form.value.email)) {
      stringNotification = "Please input valid email!";
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
        if(response.data.Response.responseCode == "Email or password not found"){
          stringNotification = response.data.Response.message;
        }
        else if(response.data.Response.responseCode === "Success Login"){
          loginSuccess = true;
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    return new Promise(() => {
      setTimeout(() => {
        if(loginSuccess){
          this.loginSrvc.logIn();
          this.router.navigateByUrl('/main-forum');
        } else {
          this.presentAlert(stringNotification);
        }
      }, 1250);
    });
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  } 
}
