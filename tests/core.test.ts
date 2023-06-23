import { describe, expect, test } from "@jest/globals";
import {
    convertToJulianDay, getApproxAtmosphericRefraction, getEccentEarthOrbit,
    getEqOfTime, getGeomMeanAnomSun, getGeomMeanLongSun, getHASunrise, getHourAngle,
    getJulianCentury, getMeanObliqEcliptic, getObliqCorr, getSolarAzimuthAngle,
    getSolarElevationAngle, getSolarElevationCorrectedForAtmRefraction, getSolarNoon,
    getSolarZenithAngle, getSunAppLong, getSunDeclin, getSunEqOfCtr, getSunlightDuration,
    getSunRadVector, getSunriseTime, getSunRtAscen, getSunsetTime, getSunTrueAnom,
    getSunTrueLong, getTrueSolarTime, getVarY
} from "@src/core";

const date = new Date(1262278800000); // January 1, 2010

const lat = 40;
const long = -105;
const timeZone = -7;
const time = 0.1 / 24;
const time_2 = 0.1 / 24 * 91;
const time_3 = 0.1 / 24 * 76;
const time_4 = 0.1 / 24 * 142;

describe("Core function test", () => {
    test("test 'covertToJulianDay' func", () => {
        expect(convertToJulianDay(date)).toBe(2455197.2083333335);
        expect(() => convertToJulianDay(new Date("1/1/1969"))).toThrowError("Invalid date");
    });

    test("test 'getJulianCentury' func", () => {
        expect(getJulianCentury(date)).toBe(0.09999201460187511);
    });

    test("test 'getGeomMeanLongSun' func", () => {
        expect(getGeomMeanLongSun(date)).toBe(280.2559655516202);
    });

    test("test 'getGeomMeanAnomSun' func", () => {
        expect(getGeomMeanAnomSun(date)).toBe(3957.146670714562);
    });

    test("test 'getEccentEarthOrbit' func", () => {
        expect(getEccentEarthOrbit(date)).toBe(0.016704429368884523);
    });

    test("test 'getSunEqOfCtr' func", () => {
        expect(getSunEqOfCtr(date)).toBe(-0.0973137957121151);
    });

    test("test 'getSunTrueLong' func", () => {
        expect(getSunTrueLong(date)).toBe(280.15865175590807);
    });

    test("test 'getSunTrueAnom' func", () => {
        expect(getSunTrueAnom(date)).toBe(3957.0493569188498);
    });

    test("test 'getSunRadVector' func", () => {
        expect(getSunRadVector(date)).toBe(0.9833179903220168);
    });

    test("test 'getSunAppLong' func", () => {
        expect(getSunAppLong(date)).toBe(280.15740480121036);
    });

    test("test 'getMeanObliqEcliptic' func", () => {
        expect(getMeanObliqEcliptic(date)).toBe(23.437990797152757);
    });

    test("test 'getObliqCorr' func", () => {
        expect(getObliqCorr(date)).toBe(23.438934934108723);
    });

    test("test 'getSunRtAscen' func", () => {
        expect(getSunRtAscen(date)).toBe(-78.95065985510631);
    });

    test("test 'getSunDeclin' func", () => {
        expect(getSunDeclin(date)).toBe(-23.050180763914142);
    });

    test("test 'getVarY' func", () => {
        expect(getVarY(date)).toBe(0.043033184197256956);
    });

    test("test 'getEqOfTime' func", () => {
        expect(getEqOfTime(date)).toBe(-3.1753023562713434);
    });

    test("test 'getHASunrise' func", () => {
        expect(getHASunrise(date, lat)).toBe(70.34111688793567);
    });

    test("test 'getSolarNoon' func", () => {
        expect(getSolarNoon(date, long, timeZone)).toBe(0.5022050710807439);
    });

    test("test 'getSunriseTime' func", () => {
        expect(getSunriseTime(date, lat, long, timeZone)).toBe(0.306813079725367);
    });

    test("test 'getSunsetTime' func", () => {
        expect(getSunsetTime(date, lat, long, timeZone)).toBe(0.6975970624361207);
    });

    test("test 'getSunlightDuration' func", () => {
        expect(getSunlightDuration(date, lat)).toBe(562.7289351034854);
    });

    test("test 'getTrueSolarTime' func", () => {
        expect(getTrueSolarTime(date, time, long, timeZone)).toBe(2.824697643728655);
    });

    // branch
    test("test 'getHourAngle' func", () => {
        expect(getHourAngle(date, time, long, timeZone)).toBe(-179.29382558906784);
    });

    test("test 'getSolarZenithAngle' func", () => {
        expect(getSolarZenithAngle(date, time, lat, long, timeZone)).toBe(163.03966201304817);
    });

    test("test 'getSolarElevationAngle' func", () => {
        expect(getSolarElevationAngle(date, time, lat, long, timeZone)).toBe(-73.03966201304817);
    });

    // branch
    test("test 'getApproxAtmosphericRefraction' func", () => {
        expect(getApproxAtmosphericRefraction(date, time, lat, long, timeZone)).toBe(0.0017596994314284073);
        expect(getApproxAtmosphericRefraction(date, time_2, lat, long, timeZone)).toBe(0.06068187246946848);
        expect(getApproxAtmosphericRefraction(date, time_3, lat, long, timeZone)).toBe(0.3201092406797924);
        expect(getApproxAtmosphericRefraction(date, time_3, lat, long, timeZone)).toBe(0.3201092406797924);
        expect(getApproxAtmosphericRefraction(new Date(2010, 4, 5), 12 / 24, 20, -105, -7)).toBe(0);
    });

    test("test 'getSolarElevationCorrectedForAtmRefraction' func", () => {
        expect(getSolarElevationCorrectedForAtmRefraction(date, time, lat, long, timeZone)).toBe(-73.03790231361674);
    });

    // branch
    test("test 'getSolarAzimuthAngle' func", () => {
        expect(getSolarAzimuthAngle(date, time, lat, long, timeZone)).toBe(2.228045613510517);
        expect(getSolarAzimuthAngle(date, time_4, lat, long, timeZone)).toBe(211.49646715364298);
    });
});
