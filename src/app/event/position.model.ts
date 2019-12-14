export class Position {
    private _latitude: number;
    private _longitude: number;

    constructor(lat: number, lng: number) {
        this._latitude = lat;
        this._longitude = lng;
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
}