// Arquivo de configuração do Playwright (genérico para portfólio)

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on'
  }
});
