# log
[![NPM](https://nodei.co/npm/@haensl%2Flog.png?downloads=true)](https://nodei.co/npm/@haensl%2Flog/)

[![npm version](https://badge.fury.io/js/@haensl%2Flog.svg)](http://badge.fury.io/js/@haensl%2Flog)
[![travis-ci build status](https://api.travis-ci.org/haensl/@haensl%2Flog.svg?branch=master)](https://travis-ci.org/haensl/@haensl%2Flog/branches)

Minimal Node.js log service.

## Installation

Via npm

`npm i --save @haensl/log`

Via yarn

`yarn add @haensl/log`

## Usage

Log exposes five functions:

`debug(...args)` _green output. does not log if_ `NODE_ENV` _is set to production._

`info(...args)` _default terminal color output._

`log(...args)` _default terminal color output._

`warn(...args)` _yellow output._

`error(...args)` _red output._

Each of them maps to the respective `console` function.
The first line of each log is prefixed with timestamp and log level.
If the first argument is a string, it is printed on the first line.
Each other argument is printed on a separate line.
If more than one argument is passed, the block is delimited by dashes.

### Examples

```javascript
console.info('test');

// 2018-11-10 23:07:16 INFO test
```

```javascript
console.error({ a: 1 }, 15, new Error('foo'));

// 2018-11-10 23:07:16 ERR
// { a: 1 }
// 15
// Error: foo
//   at Context.beforeEach (/Users/hpdietz/Developer/log/log.test.js:84:39)
//   at callFn (/Users/hpdietz/Developer/log/node_modules/mocha/lib/runnable.js:372:21)
//   at Hook.Runnable.run (/Users/hpdietz/Developer/log/node_modules/mocha/lib/runnable.js:364:7)
//   at next (/Users/hpdietz/Developer/log/node_modules/mocha/lib/runner.js:317:10)
//   at Immediate.<anonymous> (/Users/hpdietz/Developer/log/node_modules/mocha/lib/runner.js:347:5)
//   at runCallback (timers.js:810:20)
//   at tryOnImmediate (timers.js:768:5)
//   at processImmediate [as _immediateCallback] (timers.js:745:5)
// --------------------------------
```

## [Changelog](CHANGELOG.md)
