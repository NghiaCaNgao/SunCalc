<h1 align="center">Sun Calculator</h1> <br>
<p align="center">Thư viện Javascript tính toán thời gian mặt trời mọc/lặn và hơn thế nữa</p>
<p align="center">
Cloned từ <b><a href="https://gml.noaa.gov/grad/solcalc/">NOAA Solar Calculator</a></b> NOAA
</p>
<div align="center">

![npm](https://img.shields.io/npm/v/@nghiavuive/sunset_calc)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@nghiavuive/sunset_calc)
![npm downloads](https://img.shields.io/npm/dy/@nghiavuive/sunset_calc)
[![Coverage Status](https://coveralls.io/repos/github/NghiaCaNgao/SunCalc/badge.svg?branch=dev)](https://coveralls.io/github/NghiaCaNgao/SunCalc?branch=dev)

</div>

## Table of Contents

- [Feature](#features)
- [Installation](#installation)
  - [Package manager](#package-manager)
  - [CDN](#cdn)
- [Examples](#examples)
- [API](#api)

## Features

- Tính toán giờ mặt trời mọc/lặn
- Cung cấp các hàm tính toán thiên văn như `getGeomMeanLongSun`, `getEccentEarthOrbit`,...

## Installation

### Package manager

Cài đặt qua NPM

```bash
npm install @nghiavuive/sunset_calc
```

Khi cài đặt xong, ta có thể import bằng `import` hoặc `require`. Trước khi bắt đầu, đảm bảo rằng `package.json` có `"type": "module"`.

```typescript
import { LunarDate, SolarDate } from "@nghiavuive/sunset_calc";
```

Nếu sử dụng Typescript, lưu ý cấu hình `tsconfig.json` như sau:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "node",
    "module": "ESNext"
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules"]
}
```

Nếu sử dụng `require`

```javascript
const calendar = require("@nghiavuive/sunset_calc/dist/index.cjs");
```

### CDN

Sử dụng qua jsDelivr

```bash
<script src="https://cdn.jsdelivr.net/gh/NghiaCaNgao/SunCalc@latest/dist/index.umd.js"></script>
```

## Examples

Sử dụng `ES Module` với Typescript. JavaScript tương tự.

> **Note** Nếu sử dụng `ts-node` thì cần chạy `npx ts-node --esm <filename>`

Code bên dưới minh họa sử dụng Sun class để tính thời điểm mặt trời lặn.

```ts
import { ISun, Sun } from "@nghiavuive/sunset_calc";

const options: ISun = {
  date: new Date(),
  lat: 21,
  long: 105,
  time_zone: 7,
};
const sun = new Sun(options);
console.log(sun.getSunsetTime());

//18:44:24
```

Nếu sử dụng `CommonJs`

```javascript
const _sun = require("@nghiavuive/sunset_calc/dist/index.cjs");

const options = {
  date: new Date(),
  lat: 21,
  long: 105,
  time_zone: 7,
};

const sun = new _sun.Sun(options);
console.log(sun.getSunsetTime());

//18:44:24
```

## API

### Interfaces

#### `ISun`

Input của [**`Sun`**](#sun) class

```ts
interface ISun {
  lat: number; // + to N
  long: number; // + to E
  time_zone: number; // + to E
  date: Date;
}
```

### Sun

Tạo thực thể [**`Sun`**](#sun) từ [**`ISun`**](#isun).

> **Note** Ngày nhập vào phải bắt đầu từ **1970-01-01**

```ts
constructor(props: ISun);
```

**Ví dụ:**

```ts
import { ISun, Sun } from "@nghiavuive/sunset_calc";

const options: ISun = {
  date: new Date(),
  lat: 21,
  long: 105,
  time_zone: 7,
};
const sun = new Sun(options);
```

#### `sun.setDate()`

Đặt lại ngày cho thực thể [**`Sun`**](#sun)

```ts
setDate(date: Date): void
```

#### `sun.setLatLong()`

Đặt lại vịt trí cho thực thể [**`Sun`**](#sun)

```ts
 setLatLong(lat: number, long: number):void
```

#### `sun.setTimeZone()`

Đặt lại múi giờ cho thực thể [**`Sun`**](#sun)

```ts
setTimeZone(time_zone: number): void
```

#### `sun.get()`

Lấy thông tin của thực thể [**`Sun`**](#sun)

```ts
get();
```

**Ví dụ:**

```ts
import { ISun, Sun } from "@nghiavuive/sunset_calc";
const options: ISun = {
  date: new Date(),
  lat: 21,
  long: 105,
  time_zone: 7,
};
const sun = new Sun(options);

sun.setDate(new Date(2020, 1, 1));
sun.setLatLong(21, 105);
sun.setTimeZone(7);

console.log(sun.get());

// {
//   lat: 21,
//   long: 105,
//   time_zone: 7,
//   date: 2020-01-31T17:00:00.000Z,
//   jd: 2458880.2083333335
// }
```

#### `sun.getSunsetTime()`

Lấy thời gian mặt trời lặn theo định dạng `hh:mm:ss`

```ts
getSunsetTime(): string
```

#### `sun.getSunriseTime()`

Lấy thời gian mặt trời mọc theo định dạng `hh:mm:ss`

```ts
getSunriseTime(): string
```

#### `sun.getSunlightDuration()`

Lấy thời gian mặt trời chiếu sáng theo định dạng `hh:mm:ss`

```ts
getSunlightDuration(): string
```

**Ví dụ:**

```ts
import { ISun, Sun } from "@nghiavuive/sunset_calc";
const options: ISun = {
  date: new Date(2023, 5, 23),
  lat: 21,
  long: 105,
  time_zone: 7,
};
const sun = new Sun(options);

console.log(sun.);

// 13:24:31
// 05:19:46
// 18:44:17
```

### Other funcs

`convertToJulianDay`, `getApproxAtmosphericRefraction`, `getEccentEarthOrbit`,
`getEqOfTime`, `getGeomMeanAnomSun`, `getGeomMeanLongSun`, `getHASunrise`, `getHourAngle`,
`getJulianCentury`, `getMeanObliqEcliptic`, `getObliqCorr`, `getSolarAzimuthAngle`,
`getSolarElevationAngle`, `getSolarElevationCorrectedForAtmRefraction`, `getSolarNoon`,
`getSolarZenithAngle`, `getSunAppLong`, `getSunDeclin`, `getSunEqOfCtr`, `getSunlightDuration`,
`getSunRadVector`, `getSunriseTime`, `getSunRtAscen`, `getSunsetTime`, `getSunTrueAnom`,
`getSunTrueLong`, `getTrueSolarTime`, `getVarY`
`deg2rad`, `excelMod`, `formatTime`, `rad2deg`

Explain soon