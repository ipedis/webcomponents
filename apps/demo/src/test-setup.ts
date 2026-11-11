// https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment

// The server specs (`@jest-environment node`) test Express, not Angular, so
// zone.js is left out there. In that environment, zone.js would patch Node's
// own EventTarget, which every spec of the same Jest worker shares: the specs
// that run after it then crash at random on a MessagePort event (seen in CI,
// "Cannot read properties of undefined (reading 'false')").
if (typeof window !== 'undefined') {
  // A conditional require: a static import would load zone.js everywhere.
  const { setupZoneTestEnv } = require('jest-preset-angular/setup-env/zone');
  setupZoneTestEnv({
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  });
}
