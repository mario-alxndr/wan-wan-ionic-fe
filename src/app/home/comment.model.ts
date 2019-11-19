export class Comment {
    constructor(
        public id: string,
        public masterThreadId: string,
        public profileImage: string,
        public threadComment: string,
        public timestamp: string,
        public username: string
    ) {
    }
}
