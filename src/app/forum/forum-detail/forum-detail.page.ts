import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Thread } from '../thread.model';
import { Comment } from '../comment.model';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from './../../login/login.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
//import * as moment from 'moment/moment';
import * as moment from 'moment-timezone';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const TOKEN_LOGIN = 'login-key';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.page.html',
  styleUrls: ['./forum-detail.page.scss'],
})
export class ForumDetailPage implements OnInit {
  thread: Thread = new Thread();
  comments: Promise<Comment[]>;
  maxPageArr: Number[];
  maxPage: Number;
  newComment;
  commentCount;
  stringLoading = "Please wait. We are loading the Forum informations."

  private selectedPage = 1;

  constructor(
      public alertController: AlertController,
      private loginSrvc: LoginService,
      private router: Router,
      private route: ActivatedRoute,
      private storage: Storage,
      private loadingCtrl: LoadingController
  ) {
    
  }

  ionViewWillEnter() {
    this.getThreadDetail(this.selectedPage);
  }

  getThreadDetail(selectedPage) {
    if(!this.loginSrvc.userIsLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
      var tempResponse = undefined;
      var tempMaxPage;
      var threadId;
      var forumDetailPage = this;

      this.route.paramMap.subscribe(paramMap => {
        threadId = paramMap.get('threadId');
        this.stringLoading = "Please wait. We are loading the Forum informations."
        forumDetailPage.presentLoading(this.stringLoading);
        axios({
          method: 'get',
          url: environment.endPointConstant.threadDetailEndPoint + '?threadId=' + threadId  + '&page=' + selectedPage,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          if(response.data) {
            console.log(response);
            tempResponse = response.data;
            tempMaxPage = response.data.maxPage;
          }
          if(tempResponse == undefined){
            location.reload();
          }
          else {
            forumDetailPage.thread = tempResponse.thread;
            forumDetailPage.thread.timestamp = moment(moment.utc(forumDetailPage.thread.timestamp).toDate()).tz("Asia/Jakarta").format("MMM Do YY");
            if(forumDetailPage.thread.makerImage === ""){
              forumDetailPage.thread.makerImage = environment.defaultImageProfile;
            }
            forumDetailPage.comments = tempResponse.commentList;
            if(tempResponse.commentList != null) {
              for(let i=0; i<tempResponse.commentList.length; i++) {
                if(forumDetailPage.comments[i].profileImage === ""){
                  forumDetailPage.comments[i].profileImage = environment.defaultImageProfile;
                }
                forumDetailPage.comments[i].timestamp = moment(moment.utc(forumDetailPage.comments[i].timestamp).toDate()).tz("Asia/Jakarta").format("MMM Do YY");
              }
            }
            forumDetailPage.maxPage = tempMaxPage;
            if(tempMaxPage == 0){
              forumDetailPage.maxPage = 1;
            }
            forumDetailPage.maxPageArr = forumDetailPage.toBeArray(tempMaxPage);
            console.log("coey", forumDetailPage.maxPageArr);
            forumDetailPage.commentCount = tempResponse.thread.commentCount;
          }
          forumDetailPage.loadingCtrl.dismiss();
        })
        .catch(function (error){
            console.log(error);
        })
      });
    }
  }
  async presentAlertInvalidComment() {
    const alertInvalidComment = await this.alertController.create({ 
      header: 'Invalid Comment!',
      message: 'please re-enter comment',
      buttons: ['OK']
    });

    await alertInvalidComment.present();
  }

  toBeArray(n: number): number[] {
    return [...Array(n).keys()].map(i => i + 1);
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Add Comment',
      message: 'Comment mush between 1 - 100 character',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Comment Content'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: comment => {
            if(typeof comment !=null) {
              if(comment.comment.length > 55 || comment.comment.length <= 0) {
                this.presentAlertInvalidComment();
              }
              else {
                this.addNewComment(comment.comment);
              }
            }
          }
        }
      ]
    });

    await alert.present();
    
  }

  addNewComment(comment) {
    console.log(comment);
    this.storage.get(TOKEN_LOGIN).then(userObject => {
      var tempUserObject = JSON.parse(userObject);
      var tempUsername = tempUserObject.username;
      var forumDetailPage = this;

      console.log(this.thread.id);
      this.stringLoading = "Adding your comment.."
      this.presentLoading(this.stringLoading);
      axios({
        method: 'put',
        url: environment.endPointConstant.createComment + tempUsername,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          'threadMasterId': this.thread.id,
          'makerUsername' : tempUsername,
          'threadComment': comment
        }
      })
      .then(res => {
        console.log(res);
        forumDetailPage.loadingCtrl.dismiss();
        forumDetailPage.getThreadDetail(forumDetailPage.selectedPage);
      })
      .catch(error => {
        console.log(error);
      });
    })
  }

  changePage(selectedPage) {
    this.selectedPage = selectedPage;
    console.log(selectedPage);
    this.getThreadDetail(selectedPage);
  }

  ngOnInit() {  }

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
