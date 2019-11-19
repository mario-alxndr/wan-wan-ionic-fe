import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Thread } from '../thread.model';
import axios from 'axios';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-thread-category',
  templateUrl: './thread-category.page.html',
  styleUrls: ['./thread-category.page.scss'],
})

export class ThreadCategoryPage implements OnInit {
  threadList: Promise<Thread[]>;
  private selectedPage = 1;
  private category = "Moba";

  constructor(
    private router: Router,
    private loginSrvc: LoginService
  ) { 
    this.getCategoryThread(this.selectedPage, this.category);
  }

  getCategoryThread(selectedPage, selectedCategory) {
    var tempThreadList = undefined;
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
          this.getCategoryThread(selectedPage, selectedCategory);
        }
      }, 2000);
    })
  }

  changePage(selectedPage) {
    this.selectedPage = selectedPage;
    this.getCategoryThread(selectedPage, this.category);
  }

  changeCategory(selectedCategory) {
    this.category = selectedCategory;
    this.getCategoryThread(this.selectedPage, selectedCategory);
  }

  ngOnInit() {
    
  }
}
