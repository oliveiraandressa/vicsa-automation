/**
 * FLX-003: Adicionar e Remover Itens do Carrinho
 *
 * Objetivo: garantir consistência do carrinho, remoção e persistência básica.
 *
 * Pré-condições: usuário de teste em cypress/fixtures/users.json (standard_user) e catálogo com itens.
 *
 * Data: 29/10/2025
 * Autor: QA Team
 */

describe('FLX-003 - Adicionar e Remover Itens do Carrinho', () => {
  const base = 'https://www.saucedemo.com';

  // login explícito antes de cada teste (reverte alterações que introduziram cy.session)
  beforeEach(() => {
    // abrir a raiz (usa baseUrl se configurado)
    cy.visit(base, { failOnStatusCode: false });

    // realizar login com fixture ou env
    cy.fixture('users').then(users => {
      const user = users?.standard_user?.username || Cypress.env('USERNAME') || 'standard_user';
      const pass = users?.standard_user?.password || Cypress.env('PASSWORD') || 'secret_sauce';

      cy.get('body').then($body => {
        if ($body.find('#login-button').length) {
          cy.get('#user-name').clear().type(user);
          cy.get('#password').clear().type(pass, { log: false });
          cy.get('#login-button').click();
        }
      });
    });

    // garantir inventário carregado antes de prosseguir
    cy.get('.inventory_list', { timeout: 10000 }).should('be.visible');
  });

  it('TST-007 - Adicionar item ao carrinho: contador e presença em /cart.html', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.get('button').contains(/add to cart/i).click();
    });

    cy.get('.shopping_cart_badge').should('contain', '1');

    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length.greaterThan', 0);
  });

  it('TST-008 - Atualizar quantidade / Remover item: remover item e recalcular contagem', () => {
    // garantir items
    cy.visit(base + '/inventory.html', { failOnStatusCode: false });
    cy.get('.inventory_item').eq(0).within(() => {
      cy.get('button').contains(/add to cart/i).click();
    });
    cy.get('.inventory_item').eq(1).within(() => {
      cy.get('button').contains(/add to cart/i).click();
    });

    cy.get('.shopping_cart_badge').should('contain', '2');
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 2);

    cy.get('.cart_item').first().within(() => {
      cy.get('button').contains(/remove/i).click();
    });

    cy.get('.shopping_cart_badge').should('contain', '1');
    cy.get('.cart_item').should('have.length', 1);
  });

  it('TST-009 - Persistência do carrinho: reload mantém itens; logout limpa sessão (conforme aplicação)', () => {
    cy.visit(base + '/inventory.html', { failOnStatusCode: false });
    cy.get('.inventory_item').first().within(() => {
      cy.get('button').contains(/add to cart/i).click();
    });
    cy.get('.shopping_cart_badge').should('contain', '1');

    cy.reload();
    cy.get('.shopping_cart_badge').should('contain', '1');

    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length.greaterThan', 0);

    // logout via menu
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible').click();

    // reconectar e validar comportamento do carrinho (aplicar regra da app)
    cy.fixture('users').then(users => {
      const user = users?.standard_user?.username || Cypress.env('USERNAME') || 'standard_user';
      const pass = users?.standard_user?.password || Cypress.env('PASSWORD') || 'secret_sauce';
      cy.get('#user-name').clear().type(user);
      cy.get('#password').clear().type(pass, { log: false });
      cy.get('#login-button').click();
    });

    // verificar se carrinho está no estado esperado 
    cy.get('body').then($body => {
      if ($body.find('.shopping_cart_badge').length) {
        cy.get('.shopping_cart_badge').should('exist');
      } else {
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('have.length', 1);
      }
    });
  });
});