import {getSunsetTime } from "../src/core/core";
import { formatTime } from "../src/core/utils";

console.log(formatTime(getSunsetTime(new Date(), 21.028511, 105.804817, +7)));
