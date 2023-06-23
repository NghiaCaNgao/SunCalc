import { deg2rad, rad2deg, excelMod } from "./utils";

/**
 * Convert Gregory to Julius day. Valid from 1970-01-01 00:00 UTC
 * Julius day [https://vi.wikipedia.org/wiki/Ng%C3%A0y_Julius]
 * @param date Gregory date.
 * @returns Julius day.
 */
export function convertToJulianDay(date: Date): number {
    if (date.getFullYear() >= 1970) {
        return (date.valueOf() / 86400000) + 2440587.5;
    }
    else throw new Error("Invalid date");
}

/**
 * Calculate julian century. Valid from 1970-01-01 00:00 UTC
 * Julius day [https://vi.wikipedia.org/wiki/Ng%C3%A0y_Julius]
 * @param data Gregory date.
 * @returns julian century.
 */
export function getJulianCentury(data: Date): number {
    const JulianDay = convertToJulianDay(data);
    return (JulianDay - 2451545) / 36525;
}

/**
 * Calculate the geometric mean longitude of the Sun.
 * @param date Gregory date.
 * @returns geometric mean longitude of the Sun. (in degrees)
 */
export function getGeomMeanLongSun(date: Date): number { //in degrees
    const JulianCentury = getJulianCentury(date);
    const de = 280.46646 + JulianCentury * (36000.76983 + JulianCentury * 0.0003032);

    return de % 360;
}

/**
 * Calculate the mean anomaly of the Sun.
 * @param date Gregory date.
 * @returns the mean anomaly of the Sun. (in degrees)
 */
export function getGeomMeanAnomSun(date: Date): number { // in degrees
    const JulianCentury = getJulianCentury(date);

    return 357.52911 + JulianCentury * (35999.05029 - 0.0001537 * JulianCentury);
}

/**
 * Calculate the eccentricity of the Earth’s orbit.
 * @param date Gregory date.
 * @returns the eccentricity of the Earth’s orbit.
 */
export function getEccentEarthOrbit(date: Date): number {
    const JulianCentury = getJulianCentury(date);

    return 0.016708634 - JulianCentury * (0.000042037 + 0.0000001267 * JulianCentury);
}

/**
 * Calculate the Sun’s equation of the center.
 * @param date Gregory date.
 * @returns Sun’s equation of the center.
 */
export function getSunEqOfCtr(date: Date): number {
    const GeomMeanAnomSun = getGeomMeanAnomSun(date);
    const JulianCentury = getJulianCentury(date);

    let a = Math.sin(deg2rad(GeomMeanAnomSun));
    let b = (1.914602 - JulianCentury * (0.004817 + 0.000014 * JulianCentury));
    let c = Math.sin(deg2rad(2 * GeomMeanAnomSun));
    let d = (0.019993 - 0.000101 * JulianCentury);
    let e = Math.sin(deg2rad(3 * GeomMeanAnomSun)) * 0.000289;

    // console.log(a, b, c, d, e);
    return a * b + c * d + e;
}

/**
 * Calculate the Sun’s true longitude.
 * @param date Gregory date
 * @returns the Sun’s true longitude. (in degrees)
 */
export function getSunTrueLong(date: Date): number {
    return getGeomMeanLongSun(date) + getSunEqOfCtr(date);
}

/**
 * Calculate the Sun’s true anomaly.
 * @param date Gregory date
 * @returns the Sun’s true anomaly (in degrees)
 */
export function getSunTrueAnom(date: Date): number {
    return getGeomMeanAnomSun(date) + getSunEqOfCtr(date);
}

/**
 * Calculate the Sun’s radius vector 
 * (the heliocentric distance from the Sun to the Earth center-to-center).
 * @param date Gregory date
 * @returns the Sun’s radius vector. (in AUs)
 */
export function getSunRadVector(date: Date): number {
    const AccentEarthOrbit = getEccentEarthOrbit(date);
    const SunTrueAnom = getSunTrueAnom(date);

    let a = 1.000001018 * (1 - AccentEarthOrbit * AccentEarthOrbit);
    let b = 1 + AccentEarthOrbit * Math.cos(deg2rad(SunTrueAnom));

    return a / b;
}

/**
 * Calculate the Sun’s apparent longitude.
 * @param date Gregory date.
 * @returns the Sun’s apparent longitude. (in degrees)
 */
export function getSunAppLong(date: Date): number {
    const SunTrueLong = getSunTrueLong(date);
    const JulianCentury = getJulianCentury(date);

    let a = Math.sin(deg2rad(125.04 - 1934.136 * JulianCentury));

    return SunTrueLong - 0.00569 - 0.00478 * a;
}

/**
 * Calculate the obliquity of the ecliptic.
 * (the inclination of the Earth’s equator with respect to 
 * the plane at which the Sun and planets appear to move across the sky)
 * @param date Gregory date.
 * @returns the obliquity of the ecliptic. (in degrees)
 */
export function getMeanObliqEcliptic(date: Date): number {
    const JulianCentury = getJulianCentury(date);

    let a = 0.00059 - JulianCentury * 0.001813;
    let b = 46.815 + JulianCentury * a
    let c = 21.448 - JulianCentury * b;
    let d = 26 + c / 60

    return 23 + d / 60;
}

/**
 * Calculate the obliquity correction.
 * @param date Gregory date.
 * @returns the obliquity correction.(in degrees)
 */
export function getObliqCorr(date: Date): number {
    const JulianCentury = getJulianCentury(date);
    const MeanObliqEcliptic = getMeanObliqEcliptic(date);

    let a = Math.cos(deg2rad(125.04 - 1934.136 * JulianCentury))

    return MeanObliqEcliptic + 0.00256 * a;
}

/**
 * Calculate Sun right ascension.
 * @param date Gregory date.
 * @returns Sun right ascension. (in degrees)
 */
export function getSunRtAscen(date: Date): number {
    const ObliqCorr = getObliqCorr(date);
    const SunAppLong = getSunAppLong(date);

    let a = Math.sin(deg2rad(SunAppLong));
    let b = Math.cos(deg2rad(ObliqCorr));
    let c = Math.cos(deg2rad(SunAppLong));

    return rad2deg(Math.atan2(b * a, c));
}

/**
 * Calculate Sun Declination.
 * @param date Gregory date
 * @returns Sun Declination. (in degrees)
 */
export function getSunDeclin(date: Date): number {
    const SunAppLong = getSunAppLong(date);
    const ObliqCorr = getObliqCorr(date);

    let a = Math.sin(deg2rad(ObliqCorr));
    let b = Math.sin(deg2rad(SunAppLong));

    return rad2deg(Math.asin(a * b));
}

/**
 * Calculate var y.
 * @param date Gregory date.
 * @returns var y
 */
export function getVarY(date: Date): number {
    const ObliqCorr = getObliqCorr(date);

    let a = Math.tan(deg2rad(ObliqCorr / 2));
    let b = Math.tan(deg2rad(ObliqCorr / 2));

    return a * b;
}

/**
 * Calculate Equation of time.
 * @param date Gregory date.
 * @returns result of Equation of time. (in minutes)
 */
export function getEqOfTime(date: Date): number {
    const VarY = getVarY(date);
    const EccentEarthOrbit = getEccentEarthOrbit(date);
    const GeomMeanAnomSun = getGeomMeanAnomSun(date);
    const GeomMeanLongSun = getGeomMeanLongSun(date);

    let a = VarY * Math.sin(2 * deg2rad(GeomMeanLongSun));
    let b = 2 * EccentEarthOrbit * Math.sin(deg2rad(GeomMeanAnomSun));
    let c = 4 * EccentEarthOrbit * VarY * Math.sin(deg2rad(GeomMeanAnomSun)) * Math.cos(2 * deg2rad(GeomMeanLongSun));
    let d = 0.5 * VarY * VarY * Math.sin(4 * deg2rad(GeomMeanLongSun));
    let e = 1.25 * EccentEarthOrbit * EccentEarthOrbit * Math.sin(2 * deg2rad(GeomMeanAnomSun));

    return 4 * rad2deg(a - b + c - d - e);
}

/**
 * Calculate Hour Angle Of Sunrise.
 * @param date Gregory date.
 * @param latitude latitude.
 * @returns Hour Angle Of Sunrise. (in degrees)
 */
export function getHASunrise(date: Date, latitude: number): number {
    const SunDeclin = getSunDeclin(date);

    let a = Math.cos(deg2rad(90.833));
    let b = Math.cos(deg2rad(latitude)) * Math.cos(deg2rad(SunDeclin));
    let c = Math.tan(deg2rad(latitude));
    let d = Math.tan(deg2rad(SunDeclin));

    return rad2deg(Math.acos(a / b - c * d));
}

/**
 * Calculate Solar Noon Time
 * @param date Gregory date
 * @param long longitude
 * @param timeZone timeZone
 * @returns Solar Noon Time (in LST)
 */
export function getSolarNoon(date: Date, long: number, timeZone: number): number { // return in day
    const EqOfTime = getEqOfTime(date);

    return (720 - 4 * long - EqOfTime + timeZone * 60) / 1440;
}

/**
 * Calculate sunrise time
 * @param date Gregory date.
 * @param lat latitude
 * @param long longitude
 * @param timeZone timeZone
 * @returns sunrise time (in LST).
 */
export function getSunriseTime(date: Date, lat: number, long: number, timeZone: number): number { // return in day
    const SolarNoon = getSolarNoon(date, long, timeZone);
    const HASunrise = getHASunrise(date, lat);

    return SolarNoon - HASunrise * 4 / 1440
}

/**
 * Calculate sunset time
 * @param date Gregory date.
 * @param lat latitude
 * @param long longitude
 * @param timeZone timeZone
 * @returns sunset time (in LST).
 */

export function getSunsetTime(date: Date, lat: number, long: number, timeZone: number): number {
    const SolarNoon = getSolarNoon(date, long, timeZone);
    const HASunrise = getHASunrise(date, lat);

    return SolarNoon + HASunrise * 4 / 1440
}

/**
 * Calculate the sunlight duration.
 * @param date gregory date
 * @param lat latitude
 * @returns the sunlight duration. (in mins)
 */
export function getSunlightDuration(date: Date, lat: number): number {
    const HASunrise = getHASunrise(date, lat);

    return 8 * HASunrise;
}

/**
 * Calculate True Solar Time.
 * @param date gregory date
 * @param time time in day (in day)
 * @param long longitude
 * @param timeZone timezone
 * @returns True Solar Time (in mins)
 */
export function getTrueSolarTime(date: Date, time: number, long: number, timeZone: number): number {
    const EqOfTime = getEqOfTime(date);

    let a = time * 1440 + EqOfTime + 4 * long - 60 * timeZone; // maybe negative
    return excelMod(a, 1440);
}

/**
 * Calculate the hour angle.
 * @param date gregory date
 * @param time time in day (in day)
 * @param long longitude
 * @param timeZone timezone
 * @returns the hour angle (in degrees)
 */
export function getHourAngle(date: Date, time: number, long: number, timeZone: number): number {
    const TrueSolarTime = getTrueSolarTime(date, time, long, timeZone);

    return (TrueSolarTime / 4 < 0)
        ? TrueSolarTime / 4 + 180 // uncover line
        : TrueSolarTime / 4 - 180;
}

/**
 * Calculate the solar zenith Angle.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns the solar zenith Angle. (in degrees)
 */
export function getSolarZenithAngle(date: Date, time: number, lat: number, long: number, timeZone: number): number {
    const SunDeclin = getSunDeclin(date);
    const HourAngle = getHourAngle(date, time, long, timeZone);

    let a = Math.sin(deg2rad(lat));
    let b = Math.sin(deg2rad(SunDeclin));
    let c = Math.cos(deg2rad(lat));
    let d = Math.cos(deg2rad(SunDeclin));
    let e = Math.cos(deg2rad(HourAngle));

    return rad2deg(Math.acos(a * b + c * d * e));
}

/**
 * Calculate solar elevation angle.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns solar elevation angle. (in degrees)
 */
export function getSolarElevationAngle(date: Date, time: number, lat: number, long: number, timeZone: number): number {
    const SolarZenithAngle = getSolarZenithAngle(date, time, lat, long, timeZone);

    return 90 - SolarZenithAngle;
}

/**
 * Calculate approximate atmospheric refraction.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns approximate atmospheric refraction. (in degrees)
 */
export function getApproxAtmosphericRefraction(date: Date, time: number, lat: number, long: number, timeZone: number): number {
    const SolarElevationAngle = getSolarElevationAngle(date, time, lat, long, timeZone);

    return (() => {
        if (SolarElevationAngle > 85)
            return 0; // uncover line
        else if (SolarElevationAngle > 5) {
            let a = Math.tan(deg2rad(SolarElevationAngle));
            let b = Math.pow(Math.tan(deg2rad(SolarElevationAngle)), 3);
            let c = Math.pow(Math.tan(deg2rad(SolarElevationAngle)), 5);

            return 58.1 / a - 0.07 / b + 0.000086 / c;
        }
        else if (SolarElevationAngle > -0.575) {
            let a = -12.79 + SolarElevationAngle * 0.711;
            let b = 103.4 + SolarElevationAngle * a;
            let c = -518.2 + SolarElevationAngle * b;
            let d = 1735 + SolarElevationAngle * c;

            return d;
        } else {
            let a = Math.tan(deg2rad(SolarElevationAngle));

            return -20.772 / a;
        }

    })() / 3600;
}

/**
 * Calculate Solar elevation corrected atmospheric refraction.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns Solar elevation corrected atmospheric refraction. (in degrees)
 */
export function getSolarElevationCorrectedForAtmRefraction(date: Date, time: number, lat: number, long: number, timeZone: number): number {
    const SolarElevationAngle = getSolarElevationAngle(date, time, lat, long, timeZone);
    const ApproxAtmosphericRefraction = getApproxAtmosphericRefraction(date, time, lat, long, timeZone);

    return SolarElevationAngle + ApproxAtmosphericRefraction;
}

/**
 * Calculate Solar Azimuth angle.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns Solar Azimuth angle. (degrees cw from N)
 */
export function getSolarAzimuthAngle(date: Date, time: number, lat: number, long: number, timeZone: number): number {
    const SolarZenithAngle = getSolarZenithAngle(date, time, lat, long, timeZone);
    const HourAngle = getHourAngle(date, time, long, timeZone);
    const SunDeclin = getSunDeclin(date);

    let a = Math.sin(deg2rad(lat));
    let b = Math.cos(deg2rad(SolarZenithAngle));
    let c = Math.sin(deg2rad(SunDeclin));
    let d = Math.cos(deg2rad(lat));
    let e = Math.sin(deg2rad(SolarZenithAngle));
    let f = Math.acos((a * b - c) / (d * e));

    if (HourAngle > 0) {
        return excelMod(rad2deg(f) + 180, 360);
    } else {
        return excelMod(540 - rad2deg(f), 360);
    }
}