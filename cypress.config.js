const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'zew9s7',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      baseUrl: 'https://wlsf82-hacker-stories.web.app';
    }
  }
});
