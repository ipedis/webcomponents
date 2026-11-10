import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  use: {
    // The app is served under its base href: test paths are relative to it
    // (`fr/alert`, not `/fr/alert`). E2E_BASE_URL points the suite at another
    // server, such as the production build (`npm run demo:ssr`).
    baseURL:
      process.env['E2E_BASE_URL'] ?? 'http://localhost:4201/webcomponents/',
    trace: 'on-first-retry',
  },
  timeout: 45000,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],

  webServer: {
    command: 'npx nx serve demo --port 4201 --host localhost',
    url: 'http://localhost:4201/webcomponents/',
    // The tests need the list of demos (not the production redirect to the
    // design system) and no Matomo tracking, with or without a local .env.
    env: { HOME_REDIRECT: 'false', MATOMO_ENABLED: 'false' },
    reuseExistingServer: !process.env['CI'],
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
