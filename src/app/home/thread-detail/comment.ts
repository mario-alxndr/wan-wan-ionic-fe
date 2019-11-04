export class Comment {
    constructor(
        public image: string,
        public timeStamp: Date,
        public username: string,
        public threadComment: string
    ) {
    }
}
