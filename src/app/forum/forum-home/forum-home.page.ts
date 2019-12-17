import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginService } from './../../login/login.service';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Thread } from '../thread.model';
import { LoadingController } from '@ionic/angular';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';

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
  stringLoading = "Please wait. We are loading the Forum Page contents."
  empty;
  
  private selectedPage = 1;

  constructor(
    private loginSrvc: LoginService,
    private router: Router,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    this.empty = environment.defaultEmptyImage;
  }

  ionViewWillEnter() {
    this.getThreads(1);
  }
  
  public getSearchData(searchFilter){
    this.searchEmpty = false;
    var tempThreadList = undefined;
    var tempMaxPage;
    var forumHomePage = this;
    
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    if(searchFilter === ""){
      this.getThreads(1);
    }
    else{
      this.stringLoading = "We are searching the forums."
      forumHomePage.presentLoading(this.stringLoading);
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
          forumHomePage.threadList = tempThreadList;
          if(forumHomePage.threadList == undefined) {
            forumHomePage.searchEmpty = true;
            forumHomePage.maxPage = 0;
            forumHomePage.maxPageArr = [1];
          }
          else {
            for(let i=0; i< tempThreadList.length; i++) { 
              forumHomePage.threadList[i].timestamp =  moment(forumHomePage.threadList[i].timestamp).startOf('day').fromNow();
            }
            forumHomePage.maxPage = tempMaxPage;
            forumHomePage.maxPageArr = forumHomePage.toBeArray(tempMaxPage);
          }
          this.loadingCtrl.dismiss();
        })
        .catch(function (error) {
          console.log(error);
        })
      });
    }
  }  

  getThreads(selectedPage) {
    var tempThreadList = undefined;
    var tempMaxPage;
    var forumHomePage = this;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.stringLoading = "Please wait. We are loading the Forum Page contents."
      forumHomePage.presentLoading(this.stringLoading);
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
        forumHomePage.threadList = tempThreadList;
        console.log(forumHomePage.threadList);
        for(let i=0; i< tempThreadList.length; i++) { 
          forumHomePage.threadList[i].timestamp =  moment(forumHomePage.threadList[i].timestamp).startOf('day').fromNow();
        }
        forumHomePage.maxPage = tempMaxPage;
        forumHomePage.maxPageArr = forumHomePage.toBeArray(tempMaxPage);
        if(forumHomePage.threadList === undefined) {
          forumHomePage.getThreads(selectedPage);
        }
        this.loadingCtrl.dismiss();
      })
      .catch(function (error) {
        console.log(error);
      })
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

  presentLoading(stringLoading){
    console.log("mulai present")
    this.loadingCtrl.create({
      keyboardClose: true,
      message: stringLoading
    })
    .then(loadingEl => {
      loadingEl.present();
    })
    console.log("selesai present")
  }
}
