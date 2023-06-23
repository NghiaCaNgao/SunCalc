/**
 * Convert from degrees value to radians value.
 * @param {number} degrees degrees value.
 * @returns radians value corresponding to the given degrees.
 */

export function deg2rad(degrees: number): number {
    return degrees * Math.PI / 180;
}

/**
 * Convert from radians value to degrees value.
 * @param {number} radians radian value.
 * @returns degrees value corresponding to the given radians
 */
export function rad2deg(radians: number): number {
    return radians * (180 / Math.PI);
}

/**
 * Mod function (%) in most case except negative number. It simulates the function MOD in excel.
 * @param {number} num number.
 * @param {number} divisor divisor.
 * @returns mod value.
 */
export function excelMod(num: number, divisor: number): number {
    /* In js, % function is implements: 
    ** num - divisor * ((num / divisor > 0) ? num / divisor : 0)
    */

    return num - divisor * Math.floor(num / divisor);
};

/**
 * Format number in day unit into HH:MM::SS.
 * EXample: 0.1/24 (hour/day) => 00:06:00.
 * @param dayTime time in day unit
 * @returns time in format HH::MM::SS.
 */
export function formatTime(dayTime: number): string {
    let timeInSecond = Math.round(dayTime * 24 * 60 * 60);

    let hours = Math.floor(timeInSecond / 3600);
    let mins = Math.floor((timeInSecond % 3600) / 60);
    let seconds = (timeInSecond % 86400) % 60;

    return `${(hours < 10) ? "0" + hours : hours}:${(mins < 10) ? "0" + mins : mins}:${(seconds < 10) ? "0" + seconds : seconds}`;
}