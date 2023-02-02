import { describe, expect, test } from "@jest/globals"
import { deg2rad, excelMod, formatTime, rad2deg } from "../src/utils"

describe("Test utils", () => {
    test("Test 'deg2rad' function", () => {
        expect(deg2rad(90)).toBe(Math.PI / 2);
        expect(deg2rad(-90)).toBe(-Math.PI / 2);
        expect(deg2rad(0)).toBe(0);
        expect(deg2rad(360)).toBe(Math.PI * 2);
        expect(deg2rad(135)).toBe(Math.PI * 3 / 4);
    });

    test("Test 'rad2deg' function", () => {
        expect(rad2deg(Math.PI / 2)).toBe(90);
        expect(rad2deg(-Math.PI / 2)).toBe(-90);
        expect(rad2deg(0)).toBe(0);
        expect(rad2deg(Math.PI * 2)).toBe(360);
        expect(rad2deg(Math.PI * 3 / 4)).toBe(135);
    });

    test("Test 'excelMod' function", () => {
        expect(excelMod(3, 2)).toBe(1);
        expect(excelMod(-3, -2)).toBe(-1);
        expect(excelMod(3, -2)).toBe(-1);
        expect(excelMod(-3, 2)).toBe(1);
    });

    test("Test 'formatTime' function", () => {
        expect(formatTime(0.1 / 24)).toBe("00:06:00");
        expect(formatTime(0.1 / 24 * 100)).toBe("10:00:00");
        expect(formatTime(0.1 / 24 * 102)).toBe("10:12:00");
        expect(formatTime(0.09 / 24 * 102)).toBe("09:10:48");
    })
})