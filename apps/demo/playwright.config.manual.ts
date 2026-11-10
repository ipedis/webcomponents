import { defineConfig, devices } from '@playwright/test';

// Alternative config without automatic server startup
// Use this if you want to manually start the server first (`nx serve demo`,
// or `npm run demo:ssr` with E2E_BASE_URL), with HOME_REDIRECT=false.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL:
      process.env['E2E_BASE_URL'] ?? 'http://localhost:4200/webcomponents/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],

  // No webServer - expects you to start the server manually
});
