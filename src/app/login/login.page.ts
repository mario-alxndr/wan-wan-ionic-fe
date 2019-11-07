import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isFormValid = false; 
  constructor(
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  async presentAlert(stringNotification) {
    var headerText = '';
    if(this.isFormValid){headerText = "Success";}
    else {headerText = "Invalid Input";}
    const alert = await this.alertController.create({
      header: headerText,
      message: stringNotification,
      buttons: ['OK']
    });

    await alert.present();
  }

  onLogin(form) {
    var stringNotification = "";
    var counter = 0;

    if(!form.value.email || !form.value.password) {
      stringNotification += "Please enter your ";
      if(!form.value.email){
        stringNotification += "email";
        counter++;
      } 
      if(!form.value.password){
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
    else{
      //do hit endpoint
      //handle kalau password email not match
      this.isFormValid = true;
      this.router.navigateByUrl('/home/main');
    }
    this.presentAlert(stringNotification);
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }
}
