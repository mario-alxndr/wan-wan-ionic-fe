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
        'http://localhost/.png',
        'Description',
        [
            new Comment(
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                new Date(),
                'CommentName',
                'CommentContent'
            ),
            new Comment(
                new Date(),
                'CommentName',
                'CommentContent'
            ),
        ]
    );

    private comments;

    constructor() {
    }

    ngOnInit() {
        this.comments = this.threads.comment;
    }

}
