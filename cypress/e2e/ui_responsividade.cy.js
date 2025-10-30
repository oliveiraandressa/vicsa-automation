/**
 * FLX-007: Responsividade e UI
 *
 * Objetivo: capturar checkpoints visuais (screenshots) em breakpoints críticos:
 *  - 320px (mobile)
 *  - 768px (tablet)
 *  - 1024px (desktop)
 *
 * Páginas: login (/), produtos (/inventory.html), cart (/cart.html), checkout-step-one (/checkout-step-one.html)
 *
 * Pré-condições: fixture cypress/fixtures/users.json contendo standard_user ou variáveis de ambiente CYPRESS_USERNAME / CYPRESS_PASSWORD.
 *
 * Data: 29-10-2025
 * Autor: QA Team
 */

describe('FLX-007 - Responsividade e UI (checkpoints visuais)', () => {
  const base = 'https://www.saucedemo.com';

  function addFirstProductToCart() {
    cy.get('.inventory_item').first().within(() => {
      cy.get('button').contains(/add to cart/i).click();
    });
    cy.get('.shopping_cart_badge', { timeout: 5000 }).should('exist');
  }

  const viewports = [
    { w: 320, h: 800, label: '320' },
    { w: 768, h: 1024, label: '768' },
    { w: 1024, h: 1366, label: '1024' }
  ];

  viewports.forEach(vp => {
    context(`viewport ${vp.label}px`, () => {
      beforeEach(() => {
        cy.viewport(vp.w, vp.h);
        
      });

      it(`TST-017 - capture login/products/cart/checkout screenshots @ ${vp.label}px`, () => {

        /**
         * Dado que a aplicação está disponível em staging  
         * quando capturar screenshots em 320px, 768px e 1024px das páginas críticas (login, produtos, cart, checkout)  
         * então não deve haver quebras visuais críticas e elementos essenciais devem permanecer acessíveis
         */
        // 1) Login page (unauthenticated)
        cy.visit(base, { failOnStatusCode: false });
        cy.get('body', { timeout: 10000 }).should('exist');
        cy.screenshot(`responsive/${vp.label}-login`, { capture: 'viewport' });

        // 2) Ensure logged in and capture products view
        cy.login();
        cy.get('.inventory_list', { timeout: 10000 }).should('be.visible');
        cy.screenshot(`responsive/${vp.label}-products`, { capture: 'viewport' });

        // 3) Add item and capture cart
        addFirstProductToCart();
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.cart_item', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.screenshot(`responsive/${vp.label}-cart`, { capture: 'viewport' });

        // 4) Proceed to checkout-step-one and capture
        cy.get('button').contains(/checkout/i).click();
        cy.url().should('include', '/checkout-step-one.html');
        cy.get('#first-name, #last-name, #postal-code', { timeout: 10000 }).should('exist');
        cy.screenshot(`responsive/${vp.label}-checkout-step-one`, { capture: 'viewport' });
      });
    });
  });
});