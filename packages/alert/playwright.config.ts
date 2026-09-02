import { expect, defineConfig } from '@playwright/test';
import { matchers } from '@stencil/playwright';
import * as path from 'path';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

// Unique port for this package (enables parallel e2e testing)
const PORT = 3334;
const packageDir = path.resolve(__dirname);

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.e2e.ts',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
  },
  webServer: {
    command: `node ../../tools/serve-stencil-e2e.mjs ${PORT}`,
    cwd: packageDir,
    url: `http://127.0.0.1:${PORT}/ping`,
    reuseExistingServer: !process.env.CI,
  },
});
