const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './test',
  testMatch: '**/example.spec.js',
  use: {
    baseURL: 'http://localhost:8080'
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI
  }
})
