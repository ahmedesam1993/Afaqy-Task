import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['line'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
    }],
  ],
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 45000,
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'reports/test-artifacts',
});
