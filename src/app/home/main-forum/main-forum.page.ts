import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-main-forum',
  templateUrl: './main-forum.page.html',
  styleUrls: ['./main-forum.page.scss'],
})
export class MainForumPage implements OnInit {
  thread_maker = "Thread Maker";
  constructor() { }
  
  ngOnInit() { 
    var temp_thread_maker;
    axios.get(environment.endPointConstant.ThreadPageEndPoint)
    .then(resp => {
      console.log(resp.data);
      console.log(resp.data[0].makerUsername);
      temp_thread_maker = resp.data[0].makerUsername;
    })
    .catch(function (error) {
      console.log(error);
    });
    return new Promise(() => {
      setTimeout(() => {
        console.log("X" + this.thread_maker);
        this.thread_maker = temp_thread_maker;
        console.log("Y" + this.thread_maker);
      }, 1000);
    });
  }
}
