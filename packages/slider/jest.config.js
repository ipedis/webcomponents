const { createJestStencilPreset } = require('jest-stencil-runner/preset');

module.exports = createJestStencilPreset({
  displayName: 'slider',
  rootDir: __dirname,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
});
