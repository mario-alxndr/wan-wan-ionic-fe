import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Thread } from '../thread.model';
import { Comment } from '../comment.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from './../../login/login.service';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const TOKEN_LOGIN = 'login-key';

@Component({
    selector: 'app-thread-detail',
    templateUrl: './thread-detail.page.html',
    styleUrls: ['./thread-detail.page.scss'],
})
export class ThreadDetailPage implements OnInit {
  thread: Thread = new Thread();
  comments: Promise<Comment[]>;
  newComment;
  commentCount;

  private selectedPage = 1;

  constructor(
      public alertController: AlertController,
      private loginSrvc: LoginService,
      private router: Router,
      private route: ActivatedRoute,
      private storage: Storage
  ) {
     
  }

  getThreadDetail(selectedPage) {
    var tempResponse = undefined;
    var threadId;
    this.route.paramMap.subscribe(paramMap => {
      threadId = paramMap.params.threadId;
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
        }
      })
      .catch(function (error){
          console.log(error);
      })
    });

    return new Promise(() => {
      setTimeout(() => {
        if(!this.loginSrvc.userIsLoggedIn) {
          this.router.navigateByUrl('/login');
        }
        if(tempResponse == undefined){
          this.getThreadDetail(selectedPage)
        } 
        else {
          this.thread = tempResponse.thread;
          this.comments = tempResponse.commentList;
          this.commentCount = tempResponse.thread.commentCount;
        }
        
      }, 2000);
    });
  }
  async presentAlertInvalidComment() {
    const alertInvalidComment = await this.alertController.create({ 
      header: 'Invalid Comment!',
      message: 'please re-enter comment',
      buttons: ['OK']
    });

    await alertInvalidComment.present();
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
              var tempComment = comment as string;
              if(tempComment.comment.length > 55 || tempComment.comment.length <= 0) {
                this.presentAlertInvalidComment();
              }
              else {
                this.addNewComment(tempComment.comment);
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
      var tempImgCommentator = tempUserObject.profileImage;
      var tempUsername = tempUserObject.username;

      axios({
        method: 'put',
        url: environment.endPointConstant.createComment + tempUsername,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          'threadMasterId': this.thread.id,
          'timestamp': new Date(),
          'category': this.thread.category,
          'makerImage': tempImgCommentator,
          'description': comment
        }
      })
      .then(res => {
        console.log(res);
        setTimeout(() => {
          this.getThreadDetail(this.selectedPage);
        }, 150);
      })
      .catch(error => {
        console.log(error);
      });

      // return new Promise(() => {
      //   setTimeout(() => {
      //     location.reload();
      //   }, 1500);
      // });
    })
  }

  ngOnInit() {
    this.getThreadDetail(this.selectedPage);
  }
}
