export class Thread {
    private _category: string;
    private _commentCount: number;
    private _description: string;
    private _id: string;
    private _makerImage: string;
    private _makerUsername: string;
    private _name: string;
    private _timestamp: string;

    constructor() { }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get commentCount(): number {
        return this._commentCount;
    }

    set commentCount(value: number) {
        this._commentCount = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get makerImage(): string {
        return this._makerImage;
    }

    set makerImage(value: string) {
        this._makerImage = value;
    }

    get makerUsername(): string {
        return this._makerUsername;
    }

    set makerUsername(value: string) {
        this._makerUsername = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get timestamp(): string {
        return this._timestamp;
    }

    set timestamp(value: string) {
        this._timestamp = value;
    }
}
