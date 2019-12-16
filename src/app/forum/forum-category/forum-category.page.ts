import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Thread } from '../thread.model';
import axios from 'axios';
import * as moment from 'moment';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-forum-category',
  templateUrl: './forum-category.page.html',
  styleUrls: ['./forum-category.page.scss'],
})

export class ForumCategoryPage implements OnInit {
  threadList: Promise<Thread[]>;
  maxPageArr: Number[];
  maxPage: Number;

  private selectedPage = 1;
  private category = "Moba";

  constructor(
    private router: Router,
    private loginSrvc: LoginService
  ) { 
  
  }

  ionViewWillEnter() {
    this.getCategoryThread(this.selectedPage, this.category);
  }

  getCategoryThread(selectedPage, selectedCategory) {
    var tempThreadList = undefined;
    var tempMaxPage;
    var forumCategoryPage = this;

    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    axios({
      method: 'get',
      url: environment.endPointConstant.threadCategoryEndPoint + "?category=" + selectedCategory + "&page=" + selectedPage,
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
      forumCategoryPage.threadList = tempThreadList;
      if(forumCategoryPage.threadList === undefined) {
        forumCategoryPage.maxPage = 0;
        forumCategoryPage.maxPageArr = [1];
        //this.getCategoryThread(selectedPage, selectedCategory);
      }
      else {
        for(let i=0; i< tempThreadList.length; i++) { 
          forumCategoryPage.threadList[i].timestamp =  moment(forumCategoryPage.threadList[i].timestamp).startOf('day').fromNow();
        }
        forumCategoryPage.maxPage = tempMaxPage
        forumCategoryPage.maxPageArr = forumCategoryPage.toBeArray(tempMaxPage);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  toBeArray(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

  changePage(selectedPage) {
    this.selectedPage = selectedPage;
    this.getCategoryThread(selectedPage, this.category);
  }

  changeCategory(selectedCategory) {
    console.log(selectedCategory);
    this.category = selectedCategory;
    this.getCategoryThread(1, selectedCategory);
  }

  ngOnInit() {
    
  }
}
