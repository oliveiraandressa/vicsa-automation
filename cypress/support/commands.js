
// Custom commands for SauceDemo tests

//Login com sucesso
Cypress.Commands.add('login', (user = 'standard_user', pass = 'secret_sauce') => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('#user-name').clear().type(user);
  cy.get('#password').clear().type(pass, { log: false });
  cy.get('#login-button').click();
});

// Login usando dados de fixture
Cypress.Commands.add('loginAs', (userKey = 'standard_user') => {
  cy.fixture('users').then(users => {
    const u = users[userKey];
    cy.get('#user-name').clear().type(u.username);
    cy.get('#password').clear().type(u.password, { log: false });
    cy.get('#login-button').click();
  });
});
