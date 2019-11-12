import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import axios from 'axios';

@Component({
  selector: 'app-main-forum',
  templateUrl: './main-forum.page.html',
  styleUrls: ['./main-forum.page.scss'],
})
export class MainForumPage implements OnInit {
  thread_maker = "Thread Maker";
  constructor(
    private loginSrvc: LoginService,
    private router: Router,
  ) { }
  
  ngOnInit() { 
    var temp_thread_maker;
    axios.get(environment.endPointConstant.ThreadPageEndPoint)
    .then(resp => {
      // console.log(resp.data);
      // console.log(resp.data[0].makerUsername);
      temp_thread_maker = resp.data[1].makerUsername;
    })
    .catch(function (error) {
      console.log(error);
    });
    return new Promise(() => {
      setTimeout(() => {
        if(!this.loginSrvc.userIsLoggedIn) {
          this.router.navigateByUrl('/login');
        }
        this.thread_maker = temp_thread_maker;
      }, 1000);
    });
  }
}
