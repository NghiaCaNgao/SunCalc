(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Sun = void 0;
	var tslib_1 = require("tslib");
	var sun_1 = require("./modules/sun");
	Object.defineProperty(exports, "Sun", { enumerable: true, get: function() {
	  return sun_1.Sun;
	} });
	tslib_1.__exportStar(require("./modules/sun"), exports);
	tslib_1.__exportStar(require("./modules/utils"), exports);
	tslib_1.__exportStar(require("./modules/core"), exports);

}));
