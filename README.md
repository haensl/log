# log
Minimal Node.js log service.

## Installation

Via npm

`npm i --save @haensl/log`

Via yarn

`yarn add @haensl/log`

## Usage

Log exposes four functions:

`info(...args)`

`log(...args)`

`warn(...args)`

`error(...args)`

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
