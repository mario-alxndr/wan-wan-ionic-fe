import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { environment } from '../../../environments/environment';
import axios from 'axios';

const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  private username;

  constructor(
    private storage: Storage,
    private loginSrvc: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.get(TOKEN_USERNAME).then(userObject => { 
      var tempUserObject = JSON.parse(userObject);
      this.username = tempUserObject;
    });
    return new Promise(() => {
      setTimeout(() => {
        if(!this.loginSrvc.userIsLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      }, 2000);
    })
  }

  onAddEvent(form) {
    
    // axios({
    //   method: 'put',
    //   url: environment.endPointConstant.createEvent + '/:' + this.username,
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data:
    //   {
    //     'name': ,
    //     'makerUsername': ,
    //     'type': ,
    //     'games': ,
    //     'category': ,
    //     'description': ,
    //     'site': ,
    //     'dateStart': ,
    //     'dateEnd': ,
    //     'latitude': ,
    //     'longitude': ,
    //     'poster': 
    //   }
    // })
    // .then(function (response) {

    // })
  }

}
