/**
 * Convert Gregory to Julius day. Valid from 1970-01-01 00:00 UTC
 * Julius day [https://vi.wikipedia.org/wiki/Ng%C3%A0y_Julius]
 * @param date Gregory date.
 * @returns Julius day.
 */
export declare function convertToJulianDay(date: Date): number;
/**
 * Calculate julian century. Valid from 1970-01-01 00:00 UTC
 * Julius day [https://vi.wikipedia.org/wiki/Ng%C3%A0y_Julius]
 * @param data Gregory date.
 * @returns julian century.
 */
export declare function getJulianCentury(data: Date): number;
/**
 * Calculate the geometric mean longitude of the Sun.
 * @param date Gregory date.
 * @returns geometric mean longitude of the Sun. (in degrees)
 */
export declare function getGeomMeanLongSun(date: Date): number;
/**
 * Calculate the mean anomaly of the Sun.
 * @param date Gregory date.
 * @returns the mean anomaly of the Sun. (in degrees)
 */
export declare function getGeomMeanAnomSun(date: Date): number;
/**
 * Calculate the eccentricity of the Earth’s orbit.
 * @param date Gregory date.
 * @returns the eccentricity of the Earth’s orbit.
 */
export declare function getEccentEarthOrbit(date: Date): number;
/**
 * Calculate the Sun’s equation of the center.
 * @param date Gregory date.
 * @returns Sun’s equation of the center.
 */
export declare function getSunEqOfCtr(date: Date): number;
/**
 * Calculate the Sun’s true longitude.
 * @param date Gregory date
 * @returns the Sun’s true longitude. (in degrees)
 */
export declare function getSunTrueLong(date: Date): number;
/**
 * Calculate the Sun’s true anomaly.
 * @param date Gregory date
 * @returns the Sun’s true anomaly (in degrees)
 */
export declare function getSunTrueAnom(date: Date): number;
/**
 * Calculate the Sun’s radius vector
 * (the heliocentric distance from the Sun to the Earth center-to-center).
 * @param date Gregory date
 * @returns the Sun’s radius vector. (in AUs)
 */
export declare function getSunRadVector(date: Date): number;
/**
 * Calculate the Sun’s apparent longitude.
 * @param date Gregory date.
 * @returns the Sun’s apparent longitude. (in degrees)
 */
export declare function getSunAppLong(date: Date): number;
/**
 * Calculate the obliquity of the ecliptic.
 * (the inclination of the Earth’s equator with respect to
 * the plane at which the Sun and planets appear to move across the sky)
 * @param date Gregory date.
 * @returns the obliquity of the ecliptic. (in degrees)
 */
export declare function getMeanObliqEcliptic(date: Date): number;
/**
 * Calculate the obliquity correction.
 * @param date Gregory date.
 * @returns the obliquity correction.(in degrees)
 */
export declare function getObliqCorr(date: Date): number;
/**
 * Calculate Sun right ascension.
 * @param date Gregory date.
 * @returns Sun right ascension. (in degrees)
 */
export declare function getSunRtAscen(date: Date): number;
/**
 * Calculate Sun Declination.
 * @param date Gregory date
 * @returns Sun Declination. (in degrees)
 */
export declare function getSunDeclin(date: Date): number;
/**
 * Calculate var y.
 * @param date Gregory date.
 * @returns var y
 */
export declare function getVarY(date: Date): number;
/**
 * Calculate Equation of time.
 * @param date Gregory date.
 * @returns result of Equation of time. (in minutes)
 */
export declare function getEqOfTime(date: Date): number;
/**
 * Calculate Hour Angle Of Sunrise.
 * @param date Gregory date.
 * @param latitude latitude.
 * @returns Hour Angle Of Sunrise. (in degrees)
 */
export declare function getHASunrise(date: Date, latitude: number): number;
/**
 * Calculate Solar Noon Time
 * @param date Gregory date
 * @param long longitude
 * @param timeZone timeZone
 * @returns Solar Noon Time (in LST)
 */
export declare function getSolarNoon(date: Date, long: number, timeZone: number): number;
/**
 * Calculate sunrise time
 * @param date Gregory date.
 * @param lat latitude
 * @param long longitude
 * @param timeZone timeZone
 * @returns sunrise time (in LST).
 */
export declare function getSunriseTime(date: Date, lat: number, long: number, timeZone: number): number;
/**
 * Calculate sunset time
 * @param date Gregory date.
 * @param lat latitude
 * @param long longitude
 * @param timeZone timeZone
 * @returns sunset time (in LST).
 */
export declare function getSunsetTime(date: Date, lat: number, long: number, timeZone: number): number;
/**
 * Calculate the sunlight duration.
 * @param date gregory date
 * @param lat latitude
 * @returns the sunlight duration. (in mins)
 */
export declare function getSunlightDuration(date: Date, lat: number): number;
/**
 * Calculate True Solar Time.
 * @param date gregory date
 * @param time time in day (in day)
 * @param long longitude
 * @param timeZone timezone
 * @returns True Solar Time (in mins)
 */
export declare function getTrueSolarTime(date: Date, time: number, long: number, timeZone: number): number;
/**
 * Calculate the hour angle.
 * @param date gregory date
 * @param time time in day (in day)
 * @param long longitude
 * @param timeZone timezone
 * @returns the hour angle (in degrees)
 */
export declare function getHourAngle(date: Date, time: number, long: number, timeZone: number): number;
/**
 * Calculate the solar zenith Angle.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns the solar zenith Angle. (in degrees)
 */
export declare function getSolarZenithAngle(date: Date, time: number, lat: number, long: number, timeZone: number): number;
/**
 * Calculate solar elevation angle.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns solar elevation angle. (in degrees)
 */
export declare function getSolarElevationAngle(date: Date, time: number, lat: number, long: number, timeZone: number): number;
/**
 * Calculate approximate atmospheric refraction.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns approximate atmospheric refraction. (in degrees)
 */
export declare function getApproxAtmosphericRefraction(date: Date, time: number, lat: number, long: number, timeZone: number): number;
/**
 * Calculate Solar elevation corrected atmospheric refraction.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns Solar elevation corrected atmospheric refraction. (in degrees)
 */
export declare function getSolarElevationCorrectedForAtmRefraction(date: Date, time: number, lat: number, long: number, timeZone: number): number;
/**
 * Calculate Solar Azimuth angle.
 * @param date gregory date.
 * @param time time in day (in day)
 * @param lat latitude
 * @param long longitude
 * @param timeZone timezone
 * @returns Solar Azimuth angle. (degrees cw from N)
 */
export declare function getSolarAzimuthAngle(date: Date, time: number, lat: number, long: number, timeZone: number): number;
