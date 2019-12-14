import { Event } from '../event/event.model';

export class User {
    private _category: string;
    private _email: string;
    private _eventList: Event[];
    private _gameList: string[];
    private _phoneNumber: string;
    private _profileImage: string;
    private _username: string;

    constructor() { }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get eventList(): Event[] {
        return this._eventList;
    }

    set eventList(value: Event[]) {
        this._eventList = value;
    }

    get gameList(): string[] {
        return this._gameList;
    }

    set gameList(value: string[]) {
        this._gameList = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    get profileImage(): string {
        return this._profileImage;
    }

    set profileImage(value: string) {
        this._profileImage = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }
}