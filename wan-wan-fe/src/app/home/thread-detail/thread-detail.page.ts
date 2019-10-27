import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Thread} from './thread';
import {Comment} from './comment';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-thread-detail',
    templateUrl: './thread-detail.page.html',
    styleUrls: ['./thread-detail.page.scss'],
})
export class ThreadDetailPage implements OnInit {
    private threads = new Thread(
        1,
        new Date(),
        'Name',
        'Category',
        'MakerUsername',
        'assets/2157564-poring.jpg',
        'Description',
        [
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent1'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent2'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent3'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent4'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent5'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent6'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent7'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent8'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent9'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent10'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent11'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent12'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent13'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent14'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent15'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent16'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent17'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent18'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent19'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent20'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent21'
            ),
        ]
    );

    private comments = [];
    private paging = [];
    private pages = 0;
    selectedPlace: number;

    constructor(
        public alertController: AlertController
    ) {
    }

    ngOnInit() {
        this.selectedPlace = 1;
        if (this.threads.comment.length <= 0) {
            this.paging.push(1);
        } else {
            let page: number;
            page = Math.floor(this.threads.comment.length / 10);
            if (this.threads.comment.length % 10 > 0) {
                page += 1;
            }
            for (let i = 1; i <= page; i++) {
                this.paging.push(i);
            }
            this.pages = page;
        }
        this.updateComment();
    }

    updateComment() {
        this.comments = [];
        const availableComment = this.threads.comment.length - this.selectedPlace * 10;
        let slicedComment;
        if (availableComment > 0) {
            slicedComment = this.threads.comment.slice((this.selectedPlace - 1) * 10, ((this.selectedPlace - 1) * 10) + 10);
        } else {
            const max = (this.threads.comment.length - (this.selectedPlace - 1)) * 10;
            slicedComment = this.threads.comment.slice((this.selectedPlace - 1) * 10, max);
        }
        for (const com of slicedComment) {
            this.comments.push(com);
        }
    }

    addNewComment() {

        this.threads.comment.push(
            new Comment(
                'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
                new Date(),
                'Anon',
                'HueHueHue')
        );
    }

    nextPage() {
        if (this.selectedPlace < this.pages) {
            this.selectedPlace += 1;
        }
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
          header: 'Add Comment',
          inputs: [
            {
              name: 'Comment',
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
              handler: () => {
                console.log('Confirm Ok');
              }
            }
          ]
        });
    
        await alert.present();
        this.addNewComment();
    }
}
