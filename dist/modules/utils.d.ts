/**
 * Convert from degrees value to radians value.
 * @param {number} degrees degrees value.
 * @returns radians value corresponding to the given degrees.
 */
export declare function deg2rad(degrees: number): number;
/**
 * Convert from radians value to degrees value.
 * @param {number} radians radian value.
 * @returns degrees value corresponding to the given radians
 */
export declare function rad2deg(radians: number): number;
/**
 * Mod function (%) in most case except negative number. It simulates the function MOD in excel.
 * @param {number} num number.
 * @param {number} divisor divisor.
 * @returns mod value.
 */
export declare function excelMod(num: number, divisor: number): number;
/**
 * Format number in day unit into HH:MM::SS.
 * EXample: 0.1/24 (hour/day) => 00:06:00.
 * @param dayTime time in day unit
 * @returns time in format HH::MM::SS.
 */
export declare function formatTime(dayTime: number): string;
