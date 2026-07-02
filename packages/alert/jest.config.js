const preset = require('jest-stencil-runner/preset');

module.exports = {
  ...preset,
  displayName: 'alert',
  rootDir: __dirname,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};
