import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Thread } from '../thread.model';

const TOKEN_LOGIN = 'login-key';
const TOKEN_USERNAME = 'username-key';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.page.html',
  styleUrls: ['./forum-home.page.scss'],
})
export class ForumHomePage implements OnInit {
  threadList: Promise<Thread[]>;
  maxPageArr: Number[];
  maxPage: Number;
  searchEmpty: boolean;

  private selectedPage = 1;

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage
  ) {
    
  }

  ionViewWillEnter() {
    this.getThreads(1);
  }
  
  public getSearchData(searchFilter){
    this.searchEmpty = false;
    var tempThreadList = undefined;
    var tempMaxPage;
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    if(searchFilter === ""){
      this.getThreads(1);
    }
    else{
      this.storage.get(TOKEN_LOGIN).then(userObject => {
        var tempUserObject = JSON.parse(userObject);
        axios({
          method: 'get',
          url: environment.endPointConstant.searchTread +  tempUserObject.username +'/' + searchFilter.toString() + '/' + 1,
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
      });
      return new Promise(() => {
        setTimeout(() => {
          this.threadList = tempThreadList;
          if(this.threadList == undefined) {
            this.searchEmpty = true;
            this.maxPage = 0;
            this.maxPageArr = [1];
          }
          else {
            for(let i=0; i< tempThreadList.length; i++) { 
              this.threadList[i].timestamp =  moment(this.threadList[i].timestamp).startOf('day').fromNow();
            }
            this.maxPage = tempMaxPage;
            this.maxPageArr = this.toBeArray(tempMaxPage);
          }
        }, 5000);
      });
    }
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
          console.log(this.threadList);
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
