export class Event {
    private _category: string[];
    private _dateEnd: string;
    private _dateStart: string;
    private _description: string;
    private _distance: number;
    private _games: string[];
    private _id: string;
    private _latitude: number;
    private _longitude: number;
    private _makerusername: string;
    private _name: string;
    private _poster: string;
    private _site: string;
    private _timestamp: string;
    private _type: string;

    constructor() { }

    get category(): string[] {
        return this._category;
    }

    set category(value: string[]) {
        this._category = value;
    }

    get dateEnd(): string {
        return this._dateEnd;
    }

    set dateEnd(value: string) {
        this._dateEnd = value;
    }

    get dateStart(): string {
        return this._dateStart;
    }

    set dateStart(value: string) {
        this._dateStart = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get distance(): number {
        return this._distance;
    }

    set distance(value: number) {
        this._distance = value;
    }

    get games(): string[] {
        return this._games;
    }

    set games(value: string[]) {
        this._games = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get latitude(): number {
        return this._latitude;
    }

    set latitude(value: number) {
        this._latitude = value;
    }

    get longitude(): number {
        return this._longitude;
    }

    set longitude(value: number) {
        this._longitude = value;
    }

    get makerusername(): string {
        return this._makerusername;
    }

    set makerusername(value: string) {
        this._makerusername = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get poster(): string {
        return this._poster;
    }

    set poster(value: string) {
        this._poster = value;
    }

    get site(): string {
        return this._site;
    }

    set site(value: string) {
        this._site = value;
    }

    get timestamp(): string {
        return this._timestamp;
    }

    set timestamp(value: string) {
        this._timestamp = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}
