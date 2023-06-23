'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.Sun = void 0;
var tslib_1 = require("tslib");
// import { ISun, Sun } from "./modules/sun";
var sun_1 = require("./modules/sun");
Object.defineProperty(exports, "Sun", { enumerable: true, get: function () { return sun_1.Sun; } });
tslib_1.__exportStar(require("./modules/sun"), exports);
tslib_1.__exportStar(require("./modules/utils"), exports);
tslib_1.__exportStar(require("./modules/core"), exports);
// const options: ISun = {
//     date: new Date(2023, 5, 23),
//     lat: 21,
//     long: 105,
//     time_zone: 7,
// };
// const sun = new Sun(options);
// console.log(sun.getSunlightDuration());
// console.log(sun.getSunriseTime());
// console.log(sun.getSunsetTime());
//   "type": "module",
