import {getSunsetTime } from "../src/core";
import { formatTime } from "../src/utils";

console.log(formatTime(getSunsetTime(new Date(), 21.028511, 105.804817, +7)));
