/**
 * FLX-006: Filtragem e Ordenação de Produtos
 *
 * Objetivo: validar filtros e ordenações aplicadas à listagem.
 *
 * Pré-condições: catálogo variado; usuário logado (cypress/fixtures/users.json) ou env.
 *
 * Data: 29/10/2025
 * Autor: QA Team
 */

const urls = require('../support/urls');
const base = Cypress.env('BASE_URL') || urls?.BASE_URL || Cypress.config('baseUrl') || 'https://www.saucedemo.com';

function parsePrice(text) {
  if (!text) return 0;
  const cleaned = text.replace(/[^0-9.,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

describe('FLX-006 - Filtragem e Ordenação de Produtos', () => {
  const sortSelector = '[data-test="product-sort-container"], .product_sort_container, select.product_sort_container';
  const activeOptionSelector = '.right_component .select_container .active_option[data-test="active-option"]';

  beforeEach(() => {
    // visitar a raiz e fazer login (fallback caso cy.login não exista)
    cy.visit(base + '/', { failOnStatusCode: false });

    cy.login()

    // garantir inventário carregado antes de prosseguir
    cy.get('.inventory_list', { timeout: 15000 }).should('be.visible');
    cy.get('.inventory_item', { timeout: 15000 }).should('have.length.greaterThan', 0);
  });

  it('TST-015 - Filtrar por critério (Price low→high e high→low)', function () {

    /**
     * Dado que existem produtos com propriedades variadas  
     * quando aplicar filtro  
     * então somente produtos que atendam ao critério deverão ser exibidos
     */

    // verificar seletor existe
    cy.get(sortSelector).should('exist');

    // Price low -> high
    cy.get(sortSelector).select('lohi'); // ação que pode re-renderizar
    // re-query do seletor após a ação para evitar subject detached
    cy.get(sortSelector, { timeout: 5000 }).should('have.value', 'lohi');
    cy.get(activeOptionSelector, { timeout: 5000 }).should('contain.text', 'Price (low to high)');
    // garantir lista estabilizada
    cy.get('.inventory_item', { timeout: 10000 }).should('have.length.greaterThan', 0);

    // coletar e validar preços não-decrescentes
    cy.get('.inventory_item_price').then($prices => {
      const vals = [...$prices].map(el => parsePrice(el.innerText));
      expect(vals.length).to.be.greaterThan(0);
      for (let i = 1; i < vals.length; i++) {
        expect(vals[i], `price[${i}] >= price[${i-1}]`).to.be.at.least(vals[i - 1]);
      }
    });

    // Price high -> low
    cy.get(sortSelector).select('hilo');
    cy.get(sortSelector, { timeout: 5000 }).should('have.value', 'hilo');
    cy.get(activeOptionSelector, { timeout: 5000 }).should('contain.text', 'Price (high to low)');
    cy.get('.inventory_item', { timeout: 10000 }).should('have.length.greaterThan', 0);

    cy.get('.inventory_item_price').then($prices => {
      const vals = [...$prices].map(el => parsePrice(el.innerText));
      expect(vals.length).to.be.greaterThan(0);
      for (let i = 1; i < vals.length; i++) {
        expect(vals[i], `price[${i}] <= price[${i-1}]`).to.be.at.most(vals[i - 1]);
      }
    });
  });

  it('TST-016 - Ordenação por preço e nome (lohi/hilo/az/za) valida sequência', function () {
    /**
     * Dado que a listagem está visível 
     * quando aplicar ordenação (ex.: price low→high)  
     * então a sequência dos itens deverá refletir o critério selecionado
     */
    cy.get(sortSelector).should('exist');

    // price low -> high (verificação por array)
    cy.get(sortSelector).select('lohi');
    cy.get(sortSelector, { timeout: 5000 }).should('have.value', 'lohi');
    cy.get('.inventory_item', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('.inventory_item_price').then($prices => {
      const vals = [...$prices].map(el => parsePrice(el.innerText));
      const sorted = [...vals].sort((a, b) => a - b);
      expect(vals).to.deep.equal(sorted);
    });

    // price high -> low
    cy.get(sortSelector).select('hilo');
    cy.get(sortSelector, { timeout: 5000 }).should('have.value', 'hilo');
    cy.get('.inventory_item_price').then($prices => {
      const vals = [...$prices].map(el => parsePrice(el.innerText));
      const sorted = [...vals].sort((a, b) => b - a);
      expect(vals).to.deep.equal(sorted);
    });

    // name A -> Z
    cy.get(sortSelector).select('az');
    cy.get(sortSelector, { timeout: 5000 }).should('have.value', 'az');
    cy.get('.inventory_item_name').then($names => {
      const vals = [...$names].map(el => el.innerText.trim().toLowerCase());
      const sorted = [...vals].sort((a, b) => a.localeCompare(b));
      expect(vals).to.deep.equal(sorted);
    });

    // name Z -> A
    cy.get(sortSelector).select('za');
    cy.get(sortSelector, { timeout: 5000 }).should('have.value', 'za');
    cy.get('.inventory_item_name').then($names => {
      const vals = [...$names].map(el => el.innerText.trim().toLowerCase());
      const sorted = [...vals].sort((a, b) => b.localeCompare(a));
      expect(vals).to.deep.equal(sorted);
    });
  });
});
