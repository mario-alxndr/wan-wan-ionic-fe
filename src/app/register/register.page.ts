import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit { 
  isFormValid = false; 
  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  validatePhoneNumber(phonenumber) {
    var regex = /^[+|0-9][0-9]*$/;
    return regex.test(phonenumber);
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

  onRegister(form) {
    var stringNotification = "";
    var counter = 0;

    if(!form.value.email || !form.value.password || !form.value.retypepassword || !form.value.username || !form.value.phonenumber) {
      stringNotification += "Please enter your ";
      if(!form.value.email){
        stringNotification += "email";
        counter++;
      } 
      if(!form.value.password){
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += "password";
        counter++;
      } 
      if(!form.value.retypepassword){
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += " retype password";
        counter++;
      } 
      if(!form.value.username){
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += " username";
        counter++;
      } 
      if(!form.value.phonenumber){
        if(counter>0){
          stringNotification += ", ";
        }
        stringNotification += " phone number";
        counter++;
      } 
    }
    else if(!this.validateEmail(form.value.email)){
      stringNotification = "Please input valid email!";
    }
    else if(form.value.password !== form.value.retypepassword) {
      stringNotification = "Please retype correct password!";
    }
    else if((form.value.phonenumber.length < 8 && form.value.phonenumber.length > 15) || !this.validatePhoneNumber(form.value.phonenumber)) {
      stringNotification = "Please input valid phone number!";
    }
    else {
      //do hit endpoint
      //ada handle username/email/phonenumber kalo double di database nanti disini
      this.isFormValid = true;
      stringNotification = "Register success";
    }
    console.log(form.value.phonenumber.length);
    this.presentAlert(stringNotification);
  }

}
