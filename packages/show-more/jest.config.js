const preset = require('jest-stencil-runner/preset');

module.exports = {
  ...preset,
  displayName: 'show-more',
  rootDir: __dirname,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};
