const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // ✅ runner-level
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    // ✅ browser/page-level
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',

    navigationTimeout: 30000,  // ✅ com vírgula aqui (ou última sem vírgula)
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
});
