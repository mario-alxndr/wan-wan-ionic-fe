import {Component, OnInit} from '@angular/core';
import {Thread} from './thread';
import {Comment} from './comment';

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
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                'assets/2157564-poring.jpg',
                new Date(),
                'CommentName',
                'CommentContent'
            ),
        ]
    );

    private comments = [];
    private paging = [];
    private selectedPage;

    constructor() {
    }

    ngOnInit() {
        if (this.threads.comment.length > 0) {
            this.selectedPage = 1;
        }
        let page = Math.round(this.threads.comment.length / 10);
        if (this.threads.comment.length % 10 > 0) {
            page += 1;
        }
        for (let i = 0; i <= page; i++) {
            this.paging.push(i);
        }
        let availableComment = 0;
        let slicedComment;
        if (this.selectedPage + 9 > this.threads.comment.length) {
            availableComment = this.threads.comment.length;
            slicedComment = this.threads.comment.slice(this.selectedPage - 1, availableComment);
            return;
        }
        slicedComment = this.threads.comment.slice(this.selectedPage - 1, this.selectedPage + 9);
    }
}
