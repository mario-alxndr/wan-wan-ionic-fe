export class Thread {
    constructor(
        public category: string,
        public commentCount: number,
        public description: string,
        public id: string,
        public makerImage: string,
        public makerUsername: string,
        public name: string,
        public timestamp: string
    ) { }
}