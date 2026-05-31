/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  use: {
    // Base options for all tests
    timeout: 30 * 1000,
  },
  testDir: 'tests',
  reporter: [['list'], ['html', { open: 'never' }]]
};
