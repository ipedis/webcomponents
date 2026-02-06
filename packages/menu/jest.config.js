const preset = require('jest-stencil-runner/preset');

module.exports = {
  ...preset,
  displayName: 'menu',
  rootDir: __dirname,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ]
};
