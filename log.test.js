const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');
const log = require('./');
const logLevelInfo = require('./support/loglevels');
const logLevels = Object.keys(logLevelInfo);

describe('log', () => {
  let regex;
  let consoleSpy;

  describe('exports', () => {
    logLevels.forEach((logLevel) => {
      it(`exports a ${logLevel} function`, () => {
        expect(typeof log[logLevel]).to.equal('function');
      });
    });

    it('exports nothing else', () => {
      expect(Object.keys(log).length).to.equal(logLevels.length);
    });
  });

  logLevels.forEach((logLevel) => {
    describe(`${logLevel}()`, () => {
      beforeEach(() => {
        consoleSpy = sinon.spy(console, logLevel);
        regex = new RegExp(`\\d{4}-\\d{2}-\\d{2} \\d{1,2}:\\d{2}:\\d{2} ${logLevelInfo[logLevel].prefix}`);
      });

      afterEach(() => {
        console[logLevel].restore(); // eslint-disable-line no-console
      });

      describe('passing a string as first parameter', () => {
        beforeEach(() => {
          log[logLevel]('test');
        });

        it(`logs to the console.${logLevel}`, () => {
          expect(consoleSpy.calledOnce).to.be.true;
        });

        it('prepends timestamp and log level', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(regex);
        });

        it('appends the string to the line', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(/.*test/);
        });
      });

      describe('passing an error as first parameter', () => {
        beforeEach(() => {
          log[logLevel](new Error('test'));
        });

        it(`logs to the console.${logLevel} three times`, () => {
          expect(consoleSpy.calledThrice).to.be.true;
        });

        it('prepends the first line with timestamp and log level', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(regex);
        });

        it('appends the error message to the first line', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(/.*test/);
        });
      });

      describe('passing multiple parameters', () => {
        beforeEach(() => {
          log[logLevel]({ a: 1 }, 15, new Error('foo'));
        });

        it(`logs to the console.${logLevel} once for each paramter plus one Error preamble, general preamble and delimiter times`, () => {
          expect(consoleSpy.callCount).to.equal(6);
        });

        it('prepends the first line with timestamp and log level', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(regex);
        });

        it('appends a delimiter as last line', () => {
          expect(consoleSpy.lastCall.args[0]).to.match(/-+/);
        });
      });
    });
  });

  describe('debug', () => {
    let nodeEnv;
    beforeEach(() => {
      nodeEnv = process.env.NODE_ENV;
      delete require.cache[path.resolve('./index.js')];
      process.env.NODE_ENV = 'production';
      const prodLog = require('./');
      consoleSpy = sinon.spy(console, 'debug');
      prodLog.debug('test');
    });

    afterEach(() => {
      console.debug.restore(); // eslint-disable-line no-console
      process.env.NODE_ENV = nodeEnv;
    });

    it('does not log', () => {
      expect(consoleSpy.callCount).to.equal(0);
    });
  });
});
