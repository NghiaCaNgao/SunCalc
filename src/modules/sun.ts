import {
    getSunsetTime, getSunriseTime, getSunlightDuration,
    convertToJulianDay
} from "./core"
import { formatTime } from "./utils";

export interface ISun {
    lat: number; // + to N
    long: number; // + to E
    time_zone: number; // + to E
    date: Date;
}

export class Sun {
    private _lat: number;
    private _long: number;
    private _time_zone: number;
    private _date: Date;
    private _jd: number;

    constructor(props: ISun) {
        this.setDate(props.date);
        this.setTimeZone(props.time_zone);
        this.setLatLong(props.lat, props.long);
    }

    setDate(date: Date): void {
        if (date.getFullYear() < 1970) throw new Error("Invalid date");

        this._date = date;
        this._jd = convertToJulianDay(date);
    }

    setLatLong(lat: number, long: number) {
        if (lat < -90 || lat > 90) throw new Error("Invalid latitude");
        if (long < -180 || long > 180) throw new Error("Invalid longitude");

        this._lat = lat;
        this._long = long;
    }

    setTimeZone(time_zone: number) {
        let TZList = new Set<number>([
            -12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3,
            -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5,
            7, 7.5, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12, 12.75, 13, 14
        ]);
        if (!TZList.has(time_zone)) throw new Error("Invalid time zone");
        this._time_zone = time_zone;
    }

    get() {
        return {
            lat: this._lat,
            long: this._long,
            time_zone: this._time_zone,
            date: this._date,
            jd: this._jd
        }
    }

    getSunsetTime() {
        return formatTime(getSunsetTime(this._date, this._lat, this._long, this._time_zone));
    }

    getSunriseTime() {
        return formatTime(getSunriseTime(this._date, this._lat, this._long, this._time_zone));
    }

    getSunlightDuration() {
        return formatTime(getSunlightDuration(this._date, this._lat) / 60 / 24);
    }
}