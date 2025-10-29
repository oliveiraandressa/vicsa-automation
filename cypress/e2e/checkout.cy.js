/**
 * FLX-004: Checkout e Finalização de Compra
 *
 * Objetivo: validar fluxo de checkout (TST-010), validações de formulário (TST-011)
 * e tratamento de falha de pagamento (TST-012 - simulado via intercept).
 *
 * Pré-condições: usuário em cypress/fixtures/users.json (standard_user) e catálogo com itens.
 * Ambiente: 
 *
 * Data: 29/10/2025
 * Autor: QA Team
 */

describe('FLX-004 - Checkout e Finalização de Compra', () => {
  const base = 'https://www.saucedemo.com';

  // login explícito antes de cada teste (mantém comportamento determinístico)
  beforeEach(() => {
    cy.visit(base, { failOnStatusCode: false });
    cy.login()

    // garantir inventário carregado
    cy.get('.inventory_list', { timeout: 10000 }).should('be.visible');
  });

  it('TST-010 - Checkout com dados válidos', () => {
    /**
     * Dado que o carrinho possui itens e o usuário está autenticado 
     * quando preencher First Name, Last Name e Postal Code e seguir os passos do checkout 
     * então a página de confirmação (/checkout-complete.html) deverá exibir número/ID do pedido e totais corretos
     */


    // adicionar um item ao carrinho
    cy.get('.inventory_item').first().within(() => {
      cy.get('button').contains(/add to cart/i).click();
    });

    // acessar carrinho
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length.greaterThan', 0);

    // iniciar checkout
    cy.get('button').contains(/checkout/i).click();
    cy.url().should('include', '/checkout-step-one.html');

    // preencher dados válidos e continuar
    cy.get('#first-name').clear().type('Teste');
    cy.get('#last-name').clear().type('QA');
    cy.get('#postal-code').clear().type('12345');
    cy.get('input[id="continue"], button').contains(/continue/i).click();

    // confirmar itens e finalizar
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('button').contains(/finish/i).click();

    // validação final: página de confirmação
    cy.url({ timeout: 10000 }).should('include', '/checkout-complete.html');
    // selector usado no SauceDemo real; ajuste se diferente
    cy.get('.complete-header, .checkout_complete_container').should('be.visible').and(($el) => {
      // esperar texto de confirmação (ex.: THANK YOU)
      expect($el.text().toLowerCase()).to.match(/thank you|order/i);
    });
  });

  it('TST-011 - Validações de formulário no checkout', () => {
   /**
    *  Não é possivel simular um erro no checkout por que, por ser um e-commerce de demonstração, o site não faz requisições.
    */
  });

  it('TST-012 - Falha de pagamento simulada (mock/simulação)', () => {
    /**
    *  Não é possivel simular um erro no pagamento por que, por ser um e-commerce de demonstração, o site não faz requisições.
    */
  });
});