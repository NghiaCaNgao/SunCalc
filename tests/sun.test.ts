import { describe, expect, test } from "@jest/globals";
import { ISun, Sun } from "@src/sun";


describe("Test cases: 'Sun class'", () => {
    let options: ISun = {
        date: new Date(1687453200000), // 2023-06-23
        lat: 21,
        long: 105,
        time_zone: 7
    }

    test("Tests constructor", () => {
        let sun = new Sun(options);

        expect(sun.get()).toEqual({
            lat: 21,
            long: 105,
            time_zone: 7,
            date: new Date(1687453200000),
            jd: 2460118.2083333335
        })
    })

    test("Tests `setDate` func", () => {
        let sun = new Sun(options);
        sun.setDate(new Date(1677085200000)); // 2023-02-23

        expect(sun.get()).toEqual({
            lat: 21,
            long: 105,
            time_zone: 7,
            date: new Date(1677085200000),
            jd: 2459998.2083333335
        })

        expect(() => sun.setDate(new Date(1969, 1, 23))).toThrowError("Invalid date")
    })

    test("Tests `setLatLong` func", () => {
        let sun = new Sun(options);
        sun.setLatLong(10, 10);

        expect(sun.get()).toEqual({
            lat: 10,
            long: 10,
            time_zone: 7,
            date: new Date(1687453200000),
            jd: 2460118.2083333335
        })

        expect(() => sun.setLatLong(-91, 10)).toThrowError("Invalid latitude")
        expect(() => sun.setLatLong(91, 10)).toThrowError("Invalid latitude")
        expect(() => sun.setLatLong(10, 181)).toThrowError("Invalid longitude")
        expect(() => sun.setLatLong(10, -181)).toThrowError("Invalid longitude")
    })

    test("Tests `setTimeZone` func", () => {
        let sun = new Sun(options);
        sun.setTimeZone(12.75);

        expect(sun.get()).toEqual({
            lat: 21,
            long: 105,
            time_zone: 12.75,
            date: new Date(1687453200000),
            jd: 2460118.2083333335
        })

        expect(() => sun.setTimeZone(-13)).toThrowError("Invalid time zone")
        expect(() => sun.setTimeZone(15)).toThrowError("Invalid time zone")
        expect(() => sun.setTimeZone(13.6)).toThrowError("Invalid time zone")
    })

    test("Tests `getSunsetTime` func", () => {
        let sun = new Sun(options);
        expect(sun.getSunsetTime()).toBe("18:44:17")
    })
    test("Tests `getSunriseTime` func", () => {
        let sun = new Sun(options);
        expect(sun.getSunriseTime()).toBe("05:19:46")
    })
    test("Tests `getSunlightDuration` func", () => {
        let sun = new Sun(options);
        expect(sun.getSunlightDuration()).toBe("13:24:31")
    })
})