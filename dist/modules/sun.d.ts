export interface ISun {
    lat: number;
    long: number;
    time_zone: number;
    date: Date;
}
export declare class Sun {
    private _lat;
    private _long;
    private _time_zone;
    private _date;
    private _jd;
    constructor(props: ISun);
    setDate(date: Date): void;
    setLatLong(lat: number, long: number): void;
    setTimeZone(time_zone: number): void;
    get(): {
        lat: number;
        long: number;
        time_zone: number;
        date: Date;
        jd: number;
    };
    getSunsetTime(): string;
    getSunriseTime(): string;
    getSunlightDuration(): string;
}
