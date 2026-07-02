import { expect, defineConfig } from '@playwright/test';
import { matchers } from '@stencil/playwright';
import * as path from 'path';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

// Unique port for this package (enables parallel e2e testing)
const PORT = 3349;
const packageDir = path.resolve(__dirname);

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.e2e.ts',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: `npx stencil build --dev --watch --serve --no-open --port ${PORT}`,
    cwd: packageDir,
    url: `http://localhost:${PORT}/ping`,
    reuseExistingServer: !process.env.CI,
  },
});
