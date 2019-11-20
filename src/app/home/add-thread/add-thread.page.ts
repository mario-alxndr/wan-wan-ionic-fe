import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { LoginService } from '../../login/login.service';
import { User } from '../../login/user.model';
import { environment } from 'src/environments/environment';

const TOKEN_LOGIN = 'login-key';
const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.page.html',
  styleUrls: ['./add-thread.page.scss'],
})
export class AddThreadPage implements OnInit {
  user: User = new User();
  constructor(
    private storage: Storage,
    private loginSrvc: LoginService,
    private router: Router,
  ) {
    
  }

  ngOnInit() {
    this.storage.get(TOKEN_LOGIN).then(userObject => { 
      var tempUserObject = JSON.parse(userObject);
      this.user = tempUserObject;
    });
    return new Promise(() => {
      setTimeout(() => {
        if(!this.loginSrvc.userIsLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      }, 2000);
    })
    
  }

  onAddThread(form) {
    var stringNotification = "";
    var success = false;
    var counter = 0;

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
      this.storage.get(TOKEN_USERNAME).then(username => {
        axios({
          method: 'put',
          url: environment.endPointConstant.createThread,
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
        })
        .catch(function (error) {
          console.log(error);
        })
      });
    }
  }
}
