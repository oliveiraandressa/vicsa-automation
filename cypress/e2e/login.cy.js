
/**
 * FLX-001: Login e Autenticação
 * 
 * Objetivo: Validar autenticação, mensagens de erro e tratamento de contas bloqueadas.
 * 
 * Pré-condições: Contas de teste disponíveis (fixture: cypress/fixtures/users.json — standard_user, locked_out_user, problem_user).
 * 
 * Ambiente: https://www.saucedemo.com/
 * 
 * Data: 29/10/2025
 * 
 * Autor: Andressa
 */

describe('FLX-001 - Login e Autenticação', () => {
  const base = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(base);
  });

  it('TST-001 - Login válido', () => {
    /**
     * Dado que o usuário está em /login com credenciais válidas (standard_user / secret_sauce)  
     * Quando preencher usuário e senha e clicar em "Login"
     * Então será redirecionado para /inventory.html e a lista de produtos (.inventory_list) será visível
     */
    cy.loginAs('standard_user');
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
  });

  it('TST-002 - Login inválido', () => {
    /**
     * Dado que o usuário informa credenciais inválidas
     * Quando submeter o formulário de login
     * Então uma mensagem de erro clara deverá ser exibida e o acesso negado
     */
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('wrong_pass');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface');
  });

  it(' Usuário bloqueado ( TST-003)', () => {
    /**
     * - Dado que o usuário é locked_out_user
     * - Quando tentar efetuar login
     * - Então será exibida mensagem indicando que o usuário está bloqueado
     */
    cy.loginAs('locked_out_user');
    cy.get('[data-test="error"]').should('contain', 'locked out');
  });

  it('TST-004 - Campos obrigatórios (usuário/senha vazios)', () => {
    /**
     * Dado que um ou ambos os campos estão vazios  
     * Quando submeter o formulário
     * Então a mensagem apropriada por campo deverá ser exibida (ex.: "Username is required", "Password is required")
     */
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('exist').and('contain', 'Epic sadface');
  });

  //Bonus: Teste de segurança básico para injeção de script (XSS)
  it('Injeção de script não deve executar nem permitir acesso (teste XSS básico)', () => {
    const payload = "<script>alert('xss')</script>";

    // falhar se algum alert for executado (sinal de XSS)
    cy.on('window:alert', () => {
      throw new Error('Alerta executado — possível XSS');
    });

    cy.get('#user-name').clear().type(payload);
    cy.get('#password').clear().type('any_password');
    cy.get('#login-button').click();

    // não deve redirecionar para inventory
    cy.url().should('not.include', '/inventory.html');
    cy.get('[data-test="error"]').should('exist');
  });
});