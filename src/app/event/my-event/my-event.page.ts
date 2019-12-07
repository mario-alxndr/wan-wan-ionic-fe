import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const TOKEN_POSITION = 'user-location';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.page.html',
  styleUrls: ['./my-event.page.scss'],
})
export class MyEventPage implements OnInit {

  constructor(
    private loginSrvc: LoginService,
    private storage: Storage,
    private router: Router
  ) {
    this.getMyEventData();
  }

  getMyEventData() {
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this.storage.get(TOKEN_POSITION).then(res => {
      console.log(res);
    })
  }

  ngOnInit() {
  }
}
