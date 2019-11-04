import {Comment} from './comment';

export class Thread {
    constructor(
        public id: number,
        public timeStamp: Date,
        public name: string,
        public category: string,
        public makerUsername: string,
        public makerImage: string,
        public description: string,
        public comment: Comment[]
    ) {
    }
}
