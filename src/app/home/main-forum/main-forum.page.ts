import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-main-forum',
  templateUrl: './main-forum.page.html',
  styleUrls: ['./main-forum.page.scss'],
})
export class MainForumPage implements OnInit {
  threadList: Promise<Thread[]>;

  private selectedPage = 1;

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
  ) {
    this.getThreads(this.selectedPage);
  }
  
  getThreads(selectedPage) {
    var tempThreadList = undefined;
    axios({
      method: 'get',
      url: environment.endPointConstant.threadPageEndPoint + '?page=' + selectedPage,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.data.thread) {
        console.log(response);
        tempThreadList = response.data.thread;
      }
    })
    .catch(function (error) {
      console.log(error);
    })

    return new Promise(() => {
      setTimeout(() => {
        if(!this.loginSrvc.userIsLoggedIn) {
          this.router.navigateByUrl('/login');
        }
        this.threadList = tempThreadList;
        if(this.threadList === undefined) {
          this.getThreads(selectedPage);
        }
      }, 2000);
    });
  }

  changePage(selectedPage) {
    this.selectedPage = selectedPage;
    this.getThreads(selectedPage);
  }

  // nextPage(selectedPage) {
  //   this.getThreads(selectedPage++);
  //   console.log(selectedPage);
  // }

  ngOnInit() {
    
  }
}
