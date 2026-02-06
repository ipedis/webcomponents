const preset = require('jest-stencil-runner/preset');

module.exports = {
  ...preset,
  displayName: 'alert-e2e',
  rootDir: __dirname,
  testRegex: '(/__tests__/.*|\\.)(e2e)\\.(tsx?|ts?)$',
  testTimeout: 30000,
};
