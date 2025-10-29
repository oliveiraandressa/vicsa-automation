/**
 * FLX-005: Logout e Segurança de Sessão
 *
 * Objetivo: garantir encerramento de sessão e proteção de rotas.
 *
 * Pré-condições: usuário de teste em cypress/fixtures/users.json (standard_user).
 *
 * Ambiente: usa Cypress.env('BASE_URL') ou Cypress.config('baseUrl') como fallback.
 *
 * Data: 29-10-2025
 * Autor: QA Team
 */

describe('FLX-005 - Logout e Segurança de Sessão', () => {
  const base = 'https://www.saucedemo.com';

  beforeEach(() => {
    // abrir raiz e fazer login se necessário
    cy.visit(base, { failOnStatusCode: false });

    cy.login()

    // garantir que inventário carregou após login
    cy.get('.inventory_list', { timeout: 10000 }).should('be.visible');
  });

  it('TST-013 - Logout funcional', () => {
    /**
     * Dado que o usuário está logado 
     * quando clicar em "Logout" no menu 
     * então será redirecionado para a tela de login e acesso a páginas restritas será negado
     */

    // abrir menu e clicar logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible').click();

    // após logout deve voltar para a tela de login (ou exibir form de login)
    cy.get('#login-button', { timeout: 10000 }).should('be.visible');

    // acessar rota restrita deve redirecionar para login ou exibir o form
    cy.visit(base + '/inventory.html', { failOnStatusCode: false });
    // não deve manter acesso; verificar presença do form de login
    cy.get('body').then($body => {
      expect($body.find('#login-button').length).to.be.greaterThan(0);
    });
  });

  it('TST-014 - Acesso direto sem sessão', () => {
    /**
     * Dado que não há sessão ativa 
     * quando acessar diretamente /inventory.html ou /checkout-step-one.html 
     * então a aplicação deverá redirecionar para login ou retornar 401 conforme política
     */

    // primeiro garantir logout (se ainda logado)
    cy.get('body').then($body => {
      if ($body.find('#react-burger-menu-btn').length) {
        cy.get('#react-burger-menu-btn').click();
        if ($body.find('#logout_sidebar_link').length) {
          cy.get('#logout_sidebar_link').click();
        }
      }
    });

    // tentar acessar /inventory.html diretamente (não falhar no status para diagnóstico)
    cy.visit(base + '/inventory.html', { failOnStatusCode: false });

    // a aplicação deve impedir acesso: checar presença do formulário de login ou redirecionamento
    cy.get('body', { timeout: 10000 }).then($body => {
      // espera que o login form esteja presente
      expect($body.find('#login-button').length || $body.find('#user-name').length).to.be.greaterThan(0);
    });

    // opcional: garantir que não estamos em /inventory.html
    cy.url().should('not.include', '/inventory.html');
  });
});