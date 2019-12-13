import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const TOKEN_LOGIN = 'login-key';
const TOKEN_USERNAME = 'username-key';
const TOKEN_ID = 'userid-key';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  loginState = new BehaviorSubject(false)

  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.checkLogin();
    });
  }
  
  checkLogin() {
    this.storage.get(TOKEN_LOGIN).then(res => {
      if(res) {
        this.loginState.next(true);
      }
    })
  }

  get userIsLoggedIn() {
    return this.loginState.value;
  }
  
  logIn(objectUsername) {
    this.storage.set(TOKEN_LOGIN, JSON.stringify(objectUsername)).then((response) => {
      this.storage.set(TOKEN_USERNAME, objectUsername.username).then((res) => {
        this.storage.set(TOKEN_ID, objectUsername.id).then((res) => {
          this.router.navigateByUrl('forum');
          this.loginState.next(true);
        })
      });
    });
  }
  
  logOut() {
    this.storage.remove(TOKEN_LOGIN).then((response) => {
      this.loginState.next(false);
      this.router.navigateByUrl('/login');
    });
  }
}
