const chalk = require('chalk');
const logLevels = require('./support/loglevels');

const zeroPad = (d) => parseFloat(d) < 10
  ? `0${d}`
  : `${d}`;

const timestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}-${zeroPad(now.getDate())} ${now.getHours()}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
};

const log = ({ fn, prefix, color }, ...data) => {
  const msg = data[0];
  const colored = chalk[color];
  const logFn = console[fn];
  if (msg instanceof Error) {
    logFn(colored(`${timestamp()} ${prefix} ${msg.message}`));
    logFn(colored(msg.stack));
  } else if (typeof msg === 'object') {
    logFn(colored(`${timestamp()} ${prefix}`));
    logFn(colored(msg));
  } else {
    logFn(colored(`${timestamp()} ${prefix} ${msg}`));
  }

  if (data.length > 1) {
    for (let i = 1; i < data.length; i++) {
      logFn(colored(data[i]));
    }
  }

  if ((data.length && !msg) || data.length > 1) {
    logFn(colored('--------------------------------'));
  }
};

module.exports = Object.keys(logLevels)
  .reduce((m, logLevel) => {
    if (logLevel === 'debug'
      && process.env.NODE_ENV === 'production') {
      m[logLevel] = () => {};
    } else {
      m[logLevel] = log.bind(null, { fn: logLevel, prefix: logLevels[logLevel].prefix, color: logLevels[logLevel].color });
    }

    return m;
  }, {});
