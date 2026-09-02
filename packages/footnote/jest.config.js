const { createJestStencilPreset } = require('jest-stencil-runner/preset');

module.exports = createJestStencilPreset({
  displayName: 'footnote',
  rootDir: __dirname,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
});
