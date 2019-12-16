import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../../login/login.service';
import { User } from '../../login/user.model';
import { environment } from 'src/environments/environment';
import { Button } from 'protractor';

const TOKEN_LOGIN = 'login-key';
const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-forum-add',
  templateUrl: './forum-add.page.html',
  styleUrls: ['./forum-add.page.scss'],
})
export class ForumAddPage implements OnInit {
  user: User = new User();
  constructor(
    private storage: Storage,
    private loginSrvc: LoginService,
    public alertController: AlertController,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    var forumAddPage = this;
    this.storage.get(TOKEN_LOGIN).then(userObject => { 
      var tempUserObject = JSON.parse(userObject);
      this.user = tempUserObject;
      if(!forumAddPage.loginSrvc.userIsLoggedIn) {
        forumAddPage.router.navigateByUrl('/login');
      }
    });
    
  }

  onAddThread(form) {
    var stringNotification = "";
    var success = false;
    var counter = 0;
    var forumAddPage = this;

    if(!form.value.name || !form.value.category || !form.value.description) {
      stringNotification += "Please enter your ";
      if(!form.value.name) {
        stringNotification += "thread title";
        counter++;
      }
      if(!form.value.category) {
        if(counter > 0) {
          stringNotification += ", ";
        }
        stringNotification += "thread category";
        counter++;
      }
      if(!form.value.description) {
        if(counter > 0) {
          stringNotification += ", ";
        }
        stringNotification += "description";
      }
    }
    else if(form.value.name.length < 3 || form.value.name.length > 50) {
      stringNotification += "please enter thread title minimal 3 character, maximum 50 character";
    }
    else if(form.value.description.length < 10 || form.value.description.length > 200) {
      stringNotification += "please enter thread content minimal 10 character, maximum 200 character";
    }
    else {
      success = true;
    }

    if(!success) {
      this.presentAlertError(stringNotification);
    }
    else {
      forumAddPage.presentAlertAddThread(form);
    }
  }

  addComment(form) {
    this.storage.get(TOKEN_USERNAME).then(username => {
      axios({
        method: 'put',
        url: environment.endPointConstant.createThread + username,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          'timestamp': new Date(),
          'name': form.value.name,
          'category': form.value.category,
          'makerUsername': username,
          'description': form.value.description
        }
      })
      .then(response => {
        console.log(response);
        form.clear;
        this.presentAddThreadDone();
      })
      .catch(function (error) {
        console.log(error);
      })
    });
  }
  
  async presentAlertError(stringNotification) {
    const alertError = await this.alertController.create({
      header: 'Invalid Input',
      message: stringNotification,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alertError.present();
  }

  async presentAlertAddThread(form) {
    const alertConfirmation = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure want to post this thread ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.addComment(form);
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.alertController.dismiss();
          }
        }
      ]
    });
    
    await alertConfirmation.present();
  }

  async presentAddThreadDone() {
    const alertConfirmation = await this.alertController.create({
      header: 'Success',
      message: 'Thread has been added!',
      buttons: [
        {
          text: 'Go to home',
          handler: () => {
            this.router.navigateByUrl('forum/forum-home');
          }
        }
      ]

    })
    
    await alertConfirmation.present();
  }
}
