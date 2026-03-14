---
title: "Working with Time Using the moment.js Library"
date: "2019-09-01"
template: "post"
draft: false
path: "/backend/19-09-01/"
description: "When developing web applications that various users access, there are time-related tasks such as post creation time, login time, and comment timestamps. While you can use built-in DB functions like NOW(), let's explore the moment.js module that provides intuitive formatting and outputs the time you want."
category: "BackEnd"
---

When developing web applications that various users access, there are time-related tasks such as post creation time, login time, and comment timestamps that need to be handled. While you can use built-in DB server functions like NOW(), these outputs are not particularly intuitive for users to read, and if the server's timezone differs from your local timezone, the displayed time may not match what you expect. To address this, let's explore the moment.js module, which provides both user-friendly formatting and the ability to output time in your desired timezone.

### Standard Time

Before using the module, we need to understand some basic background about standard time. If you use the time-related methods built into your DB server or JavaScript without a module, you'll see abbreviations like GMT, UTC, UTC+9, and so on. These abbreviations are related to standard time systems.

- GMT: Stands for Greenwich Mean Time, which is the mean solar time based on the Royal Observatory in Greenwich, England.
- UTC: Stands for Universal Time, Coordinated, which is a time standard based on cesium atomic vibration frequency.
- UTC+9: UTC base time plus 9 hours, which is equivalent to Korean Standard Time.
- KST: Stands for Korean Standard Time, the standard time of South Korea.

Some countries also use DST (Daylight Saving Time) for certain periods. It stands for Daylight Saving Time and means advancing the standard time by one hour during the summer months.

### moment.js Basics

Install the module using npm and declare moment.

```javascript
npm install --save moment
var moment = require('moment');
```

1. Let's print the current time to the console. (When I ran it, I got: Sun Sep 01 2019 10:41:04 GMT+0900.)

```javascript
console.log(`${moment()}`);
```

2. You can achieve more intuitive output with the following code. YYYY, MM, DD hold the year, month, and day, while HH, mm, ss hold the hours, minutes, and seconds.

```javascript
console.log(`${ moment().format("YYYY-MM-DD HH:mm:ss") }`);
```

3. If you want to print individual values such as month, day, day of the week, or time separately, use the following code:

```javascript
console.log(`${ moment().month() }`);
console.log(`${ moment().date() }`);
console.log(`${ moment().day() }`);
```

4. Features like "posted X days ago" can be implemented with the code below. It tells you how many days have passed since a reference time.

```javascript
console.log(`${ moment().diff(moment('2019-08-01'),"days") }`);
```

### moment-timezone

If you're working on a server that isn't located in your local timezone rather than your own computer, the time may be displayed differently. This is where the moment-timezone module comes in. After installing both the moment and moment-timezone modules, simply set the timezone of your declared moment to the desired region.

```javascript
npm install --save moment
npm install --save moment-timezone
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
```

### Reference

Beyond displaying time in a user-friendly format in Node.js, if you're curious about the overall concept of timezones or JavaScript's Date object, the resources below may be helpful.

- [Toast meetup! - Handling Timezones in JavaScript (1)](https://meetup.toast.com/posts/125)
- [Toast meetup! - Handling Timezones in JavaScript (2)](https://meetup.toast.com/posts/130)
- [moment-timezone Official Website](https://momentjs.com/timezone/)
- [Nodejs Date-Related moment.js](http://devstory.ibksplatform.com/2018/01/nodejs-momentjs.html)
