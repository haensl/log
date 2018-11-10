const zeroPad = (d) => parseFloat(d) < 10
  ? `0${d}`
  : `${d}`;

const timestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}-${zeroPad(now.getDate())} ${now.getHours()}:${zeroPad(now.getMinutes())}:${zeroPad(now.getSeconds())}`;
};

const logLevels = {
  info: 'INFO',
  log: 'LOG',
  warn: 'WARN',
  error: 'ERR'
};

const log = (level, ...data) => {
  const msg = data[0];
  if (msg instanceof Error) {
    console[level](`${timestamp()} ${logLevels[level]} ${msg.message}`);
    console[level](msg.stack);
  } else if (typeof msg === 'object') {
    console[level](`${timestamp()} ${logLevels[level]}`);
    console[level](msg);
  } else {
    console[level](`${timestamp()} ${logLevels[level]} ${msg}`);
  }

  if (data.length > 1) {
    for (let i = 1; i < data.length; i++) {
      console[level](data[i]);
    }

    console[level]('--------------------------------');
  }
};

module.exports = Object.keys(logLevels)
  .reduce((m, logLevel) => {
    m[logLevel] = log.bind(null, logLevel);
    return m;
  }, {});
