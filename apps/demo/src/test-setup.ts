// https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment

// The app runs without zone.js, and so do its specs. The server specs
// (`@jest-environment node`) test Express, not Angular: no TestBed there.
if (typeof window !== 'undefined') {
  // A conditional require: a static import would also load the Angular
  // testing environment in the server specs.
  const {
    setupZonelessTestEnv,
  } = require('jest-preset-angular/setup-env/zoneless');
  setupZonelessTestEnv({
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  });
}
