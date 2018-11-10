const expect = require('chai').expect;
const sinon = require('sinon');
const log = require('./');

const logLevels = [
  'info',
  'log',
  'warn',
  'error'
];

const prefixes = {
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERR'
};

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
        regex = new RegExp(`^\\d{4}-\\d{2}-\\d{2} \\d{1,2}:\\d{2}:\\d{2} ${prefixes[logLevel]}`);
      });

      afterEach(() => {
        console[logLevel].restore();
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
          expect(consoleSpy.firstCall.args[0]).to.match(/.*test$/);
        });
      });

      describe('passing an error as first parameter', () => {
        beforeEach(() => {
          log[logLevel](new Error('test'));
        });

        it(`logs to the console.${logLevel} two times`, () => {
          expect(consoleSpy.calledTwice).to.be.true;
        });

        it('prepends the first line with timestamp and log level', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(regex);
        });

        it('appends the error message to the first line', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(/.*test$/);
        });
      });

      describe('passing multiple parameters', () => {
        beforeEach(() => {
          log[logLevel]({ a: 1 }, 15, new Error('foo'));
        });

        it(`logs to the console.${logLevel} once for each paramter plus preamble and delimiter times`, () => {
          expect(consoleSpy.callCount).to.equal(5);
        });

        it('prepends the first line with timestamp and log level', () => {
          expect(consoleSpy.firstCall.args[0]).to.match(regex);
        });

        it('appends a delimiter as last line', () => {
          expect(consoleSpy.lastCall.args[0]).to.match(/^-+$/);
        });
      });
    });
  });
});
