/* eslint-disable no-undef */
import { expect } from '@playwright/test';
import { matchers } from '@stencil/playwright';
import { defineConfig } from '@playwright/test';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3333',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {},
    },
  ],
});
