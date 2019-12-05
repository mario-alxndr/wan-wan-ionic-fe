import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-main-forum',
  templateUrl: './main-forum.page.html',
  styleUrls: ['./main-forum.page.scss'],
})
export class MainForumPage implements OnInit {
  threadList: Promise<Thread[]>;
  maxPageArr: Number[];
  maxPage: Number;

  private selectedPage = 1;

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
  ) {
    this.getThreads(this.selectedPage);
  }
  
  getThreads(selectedPage) {
    var tempThreadList = undefined;
    var tempMaxPage;
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
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
          tempMaxPage = response.data.maxPage;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  
      return new Promise(() => {
        setTimeout(() => {
          this.threadList = tempThreadList;
          for(let i=0; i< tempThreadList.length; i++) { 
            this.threadList[i].timestamp =  moment(this.threadList[i].timestamp).startOf('day').fromNow();
          }
          this.maxPage = tempMaxPage;
          this.maxPageArr = this.toBeArray(tempMaxPage);
          if(this.threadList === undefined) {
            this.getThreads(selectedPage);
          }
        }, 5000);
      });
    }
  }

  toBeArray(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

  changePage(selectedPage) {
    this.selectedPage = selectedPage;
    console.log(selectedPage);
    this.getThreads(selectedPage);
  }

  ngOnInit() {
    
  }
}
