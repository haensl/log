const chalk = require('chalk');
const logLevels = require('./support/loglevels');

const zeroPad = (d) => parseFloat(d) < 10
  ? `0${d}`
  : `${d}`;

const timestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}-${zeroPad(now.getDate())} ${now.getHours()}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
};

const logFn = ({ fn, prefix, color }, ...data) => {
  const colored = chalk[color];
  const logFn = console[fn]; // eslint-disable-line no-console
  for (let msg, i = 0; i < data.length; i++) {
    msg = data[i];
    if (msg instanceof Error) {
      logFn(colored(`${timestamp()} ${prefix} ${msg.message}`));
      logFn(colored(msg.stack));
    } else if (typeof msg === 'object') {
      logFn(colored(`${timestamp()} ${prefix}`));
      logFn(colored(JSON.stringify(msg, null, 2)));
    } else {
      logFn(colored(`${timestamp()} ${prefix} ${msg}`));
    }
  }

  if (typeof data[0] === 'object' || data.length > 1) {
    logFn(colored('--------------------------------'));
  }
};

const log = Object.keys(logLevels)
  .reduce((m, logLevel) => {
    if (logLevel === 'debug'
      && process.env.NODE_ENV === 'production') {
      m[logLevel] = () => {}; // eslint-disable-line no-empty-function
    } else {
      m[logLevel] = logFn.bind(null, {
        fn: logLevel,
        prefix: logLevels[logLevel].prefix,
        color: logLevels[logLevel].color
      });
    }

    return m;
  }, {});

module.exports = log;
