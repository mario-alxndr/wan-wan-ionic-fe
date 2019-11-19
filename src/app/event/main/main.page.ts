import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
  ) {
    this.getEvents();
  }

  getEvents() {
    // var tempEventList = undefined;
    // axios({
    //   method: 'get',
    //   url: environment.endPointConstant.eventPageEndPoint + ;
    // })
    // .then(response => {

    // })
  }

  ngOnInit() {

  }

}
