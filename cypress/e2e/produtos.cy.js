/**
 * FLX-002: Navegação e Exibição de Produtos
 *
 * Objetivo: validar listagem de produtos e navegação ao detalhe do produto.
 * Pré-condições: catálogo populado em staging.
 *
 * Data: 29/10/2025
 * Autor: QA Team
 */

const baseUrl = 'https://www.saucedemo.com';

describe('FLX-002 - Navegação e Exibição de Produtos', () => {

  beforeEach(() => {
    cy.login()
  });

  it('TST-005 - Listagem de produtos', () => {
    /** 
     * Dado que o usuário acessa /inventory.html  
     * quando a página terminar de carregar  
     * então os cards de produto devem mostrar imagem, nome e preço; 
     * */ 
    //Verifica se tem pelo menos um item
    cy.get('.inventory_item', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('.inventory_item').first().within(() => {
      //Se mostra o nome
      cy.get('.inventory_item_name').should('be.visible');
      //Se mostra o preço
      cy.get('.inventory_item_price').should('be.visible');
      //E se tem imagem
      cy.get('img').should('have.attr', 'src').and('not.be.empty');
    });
  });

  it('TST-006 - Detalhe do produto', () => {
    /**
     * 
     * Dado que existe um produto na listagem  
     * quando o usuário clicar no card do produto
     * então abrirá a página de detalhe contendo descrição, preço e botão "Add to cart"
     */

    // navegar por clique (evita problemas de acesso direto)
    cy.get('.inventory_item_name').first().click();
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('be.visible');
    cy.get('.inventory_details_desc').should('be.visible');
    cy.get('button').contains(/add to cart/i).should('be.visible');
  });

   it('TST-006 - Detalhe do produto', () => {
     // Validar atributos alt em imagens e existência de seletores/data-test para estabilidade de automação.
     cy.get('img').each(($img) => {
       cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
     });
     cy.get('[data-test]').should('exist');
   });
});