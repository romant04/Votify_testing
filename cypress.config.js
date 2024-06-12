const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://auth.votify.app/cs",
    env: {
      loginUrl: '/',
      registerUrl: '/sign-up'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
